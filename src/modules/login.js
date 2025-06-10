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

    const loginFaild = createElementWithClasses(
      'p',
      'loginFaild',
      'isHidden',
      'errorMessage'
    );
    loginFaild.textContent = 'ユーザーIDまたはパスワードが間違っています';

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
    loginPasswordErrorContainer.append(passwordRequired, loginFaild);

    const overlayElement = createOverlayWithContent(loginForm);

    loginUserIdInput.addEventListener('input', () => {
      loginUserIdInput.value = loginUserIdInput.value.replace(
        /[^a-zA-Z0-9]/g,
        ''
      );
    });
    loginPasswordInput.addEventListener('input', () => {
      loginPasswordInput.value = loginPasswordInput.value.replace(
        /[^a-zA-Z0-9]/g,
        ''
      );
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      resetAllErrors(loginForm);

      const userId = loginUserIdInput.value.trim();
      const password = loginPasswordInput.value.trim();

      const users = JSON.parse(localStorage.getItem('users')) || [];

      let hasError = false;
      let foundUser = null;

      if (loginUserIdInput.value.length === 0) {
        console.log('ユーザーID未入力');
        showError(
          loginForm,
          '.userIdRequired',
          'ユーザーIDが入力されていません'
        );
        hasError = true;
      }
      if (loginPasswordInput.value.length === 0) {
        console.log('パスワード未入力');
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
            user.userId === loginUserIdInput.value &&
            user.password === loginPasswordInput.value
        );
        if (!foundUser) {
          console.log('ユーザー見つからず');
          showError(
            loginForm,
            '.loginFaild',
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

      console.log('ログイン成功！');
      overlayElement.remove();
      myUserName.textContent = foundUser.userName;
      showCenterToast(`ようこそ！${foundUser.userName}さん！`);
    });
    clickedOverlay(loginForm, overlayElement);
  });
}
