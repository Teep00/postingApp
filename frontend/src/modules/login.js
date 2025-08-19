import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { showCenterToast } from '../utils/toast.js';
import { myUserName } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import { showError, resetAllErrors } from '../utils/errorMessage.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { likeButtonDisabled } from '../utils/likeButtonDisabled.js';

export function handleLogin(loginBtn) {
  loginBtn.addEventListener('click', () => {
    const loginForm = createElementWithClasses('form', 'loginForm');

    const loginFormSectionTitle = createElementWithClasses(
      'h2',
      'loginFormSectionTitle'
    );
    loginFormSectionTitle.textContent = 'ログイン';

    const loginUserIdArea = createElementWithClasses('div', 'loginUserIdArea');

    const loginUserIdAreaTitle = createElementWithClasses(
      'h3',
      'loginUserIdAreaTitle'
    );
    loginUserIdAreaTitle.textContent = 'ユーザーID';

    const loginUserIdOuter = createElementWithClasses(
      'div',
      'loginUserIdOuter'
    );

    const loginUserIdInput = createElementWithClasses(
      'input',
      'loginUserIdInput'
    );
    loginUserIdInput.type = 'text';
    loginUserIdInput.maxlength = '15';

    const loginUserIdErrorContainer = createElementWithClasses(
      'div',
      'loginUserIdErrorContainer'
    );

    const userIdRequired = createElementWithClasses(
      'p',
      'userIdRequired',
      'isHidden',
      'errorMessage'
    );
    userIdRequired.textContent = 'ユーザーIDが入力されていません';

    const loginPasswordArea = createElementWithClasses(
      'div',
      'loginPasswordArea'
    );

    const loginPasswordAreaTitle = createElementWithClasses(
      'h3',
      'loginPasswordAreaTitle'
    );
    loginPasswordAreaTitle.textContent = 'パスワード';

    const loginPasswordOuter = createElementWithClasses(
      'div',
      'loginPasswordOuter'
    );

    const loginPasswordInput = createElementWithClasses(
      'input',
      'loginPasswordInput'
    );
    loginPasswordInput.type = 'password';
    loginPasswordInput.maxlength = '15';

    const loginPasswordErrorContainer = createElementWithClasses(
      'div',
      'loginPasswordErrorContainer'
    );

    const passwordRequired = createElementWithClasses(
      'p',
      'passwordRequired',
      'isHidden',
      'errorMessage'
    );
    passwordRequired.textContent = 'パスワードが入力されていません';

    const invalidCredentials = createElementWithClasses(
      'p',
      'invalidCredentials',
      'isHidden',
      'errorMessage'
    );
    invalidCredentials.textContent =
      'ユーザーIDまたはパスワードが間違っています';

    const loginRequestError = createElementWithClasses(
      'p',
      'loginRequestError',
      'isHidden',
      'errorMessage'
    );
    loginRequestError.textContent = 'ログインに失敗しました';

    const loginFormInBtn = createElementWithClasses('button', 'loginFormInBtn');
    loginFormInBtn.textContent = 'ログイン';
    loginFormInBtn.type = 'submit';

    loginForm.append(
      loginFormSectionTitle,
      loginUserIdArea,
      loginPasswordArea,
      loginFormInBtn
    );

    loginUserIdArea.append(
      loginUserIdAreaTitle,
      loginUserIdOuter,
      loginUserIdErrorContainer
    );
    loginUserIdOuter.append(loginUserIdInput);
    loginUserIdErrorContainer.append(userIdRequired);

    loginPasswordArea.append(
      loginPasswordAreaTitle,
      loginPasswordOuter,
      loginPasswordErrorContainer
    );
    loginPasswordOuter.append(loginPasswordInput);
    loginPasswordErrorContainer.append(
      passwordRequired,
      invalidCredentials,
      loginRequestError
    );

    const overlayElement = createOverlayWithContent(loginForm);

    loginUserIdInput.addEventListener('input', () => {
      loginUserIdInput.value = loginUserIdInput.value
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim();
    });
    loginPasswordInput.addEventListener('input', () => {
      loginPasswordInput.value = loginPasswordInput.value
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim();
    });

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      resetAllErrors(loginForm);

      const inputUserId = loginUserIdInput.value.trim();
      const inputPassword = loginPasswordInput.value.trim();

      let users = [];
      try {
        users = await fetch('http://localhost:3000/users').then((res) =>
          res.json()
        );
      } catch (error) {
        showError(loginForm, '.loginRequestError', 'ログインに失敗しました');
      }

      let hasError = false;
      let foundUser = null;

      if (loginUserIdInput.value.length === 0) {
        showError(
          loginForm,
          '.userIdRequired',
          'ユーザーIDが入力されていません'
        );
        hasError = true;
      }
      if (loginPasswordInput.value.length === 0) {
        showError(
          loginForm,
          '.passwordRequired',
          'パスワードが入力されていません'
        );
        hasError = true;
      }

      if (!hasError) {
        foundUser = users.find(
          (user) =>
            user.userId === inputUserId && user.password === inputPassword
        );
        if (!foundUser) {
          showError(
            loginForm,
            '.invalidCredentials',
            'ユーザーIDまたはパスワードが間違っています'
          );
          return;
        }
      }

      if (hasError) return;

      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      likeButtonDisabled();

      /*---------------- ボタンの表示・非表示切り替え ----------------- */
      postsButtonVisibility(true);
      /*---------------------------------------------------------- */

      overlayElement.remove();
      myUserName.textContent = foundUser.userName;
      showCenterToast(`ようこそ！${foundUser.userName}さん！`);
    });
    clickedOverlay(loginForm, overlayElement);
  });
}
