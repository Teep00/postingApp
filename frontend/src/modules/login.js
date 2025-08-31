// インポート
import { BASE_URL } from '../../baseURL.js';
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { showCenterToast } from '../utils/toast.js';
import { myUserName } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { likeButtonDisabled } from '../utils/likeButtonDisabled.js';

// ------------------------------------------------------- //
/*      ログイン関数                                         */
// ------------------------------------------------------- //

export function handleLogin(loginBtn) {
  loginBtn.addEventListener('click', () => {
    // DOM構築
    const { form: loginForm, overlayElement, elements } = createLoginForm();

    loginForm.addEventListener('submit', async (e) => {
      // デフォルトのフォーム送信を防止
      e.preventDefault();

      // 以前のエラーメッセージをリセット
      resetAllErrors(loginForm);

      // 入力値の取得
      const loginUserIdValue = elements.loginUserIdInput.value.trim();
      const loginPasswordValue = elements.loginPasswordInput.value.trim();

      // エラーフラグ
      let hasError = false;

      // ユーザーIDのバリデーション
      if (loginUserIdValue.length === 0) {
        showError(loginForm, '.userIdRequired', errorMessage.userIdRequired);
        hasError = true;
      }

      // パスワードのバリデーション
      if (loginPasswordValue.length === 0) {
        showError(
          loginForm,
          '.passwordRequired',
          errorMessage.passwordRequired
        );
        hasError = true;
      }

      // エラーがあれば処理中断
      if (hasError) return;

      // ユーザー情報を格納する配列
      let users = [];

      // サーバーエラー時の処理
      try {
        users = await fetch(`${BASE_URL}/users`).then((res) => res.json());
      } catch (error) {
        showError(
          loginForm,
          '.loginRequestError',
          errorMessage.loginRequestError
        );
        return;
      }

      // ユーザー情報の照合
      const foundUser = users.find(
        (user) =>
          user.userId === loginUserIdValue &&
          user.password === loginPasswordValue
      );

      // データベースにユーザー情報が存在するか確認
      if (!foundUser) {
        showError(
          loginForm,
          '.invalidCredentials',
          errorMessage.invalidCredentials
        );
        return;
      }

      // ユーザー情報が見つからない場合の処理
      if (!foundUser) {
        showError(
          loginForm,
          '.invalidCredentials',
          errorMessage.invalidCredentials
        );
        return;
      }

      // ログイン成功処理
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      likeButtonDisabled();

      document.querySelectorAll('.post').forEach((post) => {
        const heartIcon = post.querySelector('.heartIcon');
        const postId = post.dataset.id;
        if (foundUser.likedPosts.includes(String(postId))) {
          heartIcon.classList.add('liked');
        } else {
          heartIcon.classList.remove('liked');
        }
      });

      // ボタンの表示・非表示切り替え
      postsButtonVisibility(true);

      // オーバーレイを閉じる
      overlayElement.remove();

      // ユーザー名の表示とウェルカムメッセージ
      myUserName.textContent = foundUser.userName;
      showCenterToast(`ようこそ！${foundUser.userName}さん！`);
    });

    // オーバーレイをクリックした時の処理
    clickedOverlay(loginForm, overlayElement);
  });
}

// ------------------------------------------------------- //
/*      DOM構築関数                                         */
// ------------------------------------------------------- //

function createLoginForm() {
  // フォーム全体
  const loginForm = createElementWithClasses('form', 'loginForm');

  const loginFormSectionTitle = createElementWithClasses(
    'h2',
    'loginFormSectionTitle'
  );
  loginFormSectionTitle.textContent = 'ログイン';

  // ユーザーID
  const loginUserIdArea = createElementWithClasses('div', 'loginUserIdArea');
  const loginUserIdAreaTitle = createElementWithClasses(
    'h3',
    'loginUserIdAreaTitle'
  );
  loginUserIdAreaTitle.textContent = 'ユーザーID';

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

  // パスワード
  const loginPasswordArea = createElementWithClasses(
    'div',
    'loginPasswordArea'
  );
  const loginPasswordAreaTitle = createElementWithClasses(
    'h3',
    'loginPasswordAreaTitle'
  );
  loginPasswordAreaTitle.textContent = 'パスワード';

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

  const invalidCredentials = createElementWithClasses(
    'p',
    'invalidCredentials',
    'isHidden',
    'errorMessage'
  );

  const loginRequestError = createElementWithClasses(
    'p',
    'loginRequestError',
    'isHidden',
    'errorMessage'
  );

  // ログインボタン
  const loginFormInBtn = createElementWithClasses('button', 'loginFormInBtn');
  loginFormInBtn.textContent = 'ログイン';
  loginFormInBtn.type = 'submit';

  // append処理
  loginForm.append(
    loginFormSectionTitle,
    loginUserIdArea,
    loginPasswordArea,
    loginFormInBtn
  );

  loginUserIdArea.append(
    loginUserIdAreaTitle,
    loginUserIdInput,
    loginUserIdErrorContainer
  );
  loginUserIdErrorContainer.append(userIdRequired);

  loginPasswordArea.append(
    loginPasswordAreaTitle,
    loginPasswordInput,
    loginPasswordErrorContainer
  );

  loginPasswordErrorContainer.append(
    passwordRequired,
    invalidCredentials,
    loginRequestError
  );

  // オーバーレイ作成
  const overlayElement = createOverlayWithContent(loginForm);

  // 各要素をオブジェクトにまとめて返す
  const elements = {
    loginUserIdInput,
    loginPasswordInput,
    userIdRequired,
    passwordRequired,
    invalidCredentials,
    loginRequestError,
  };

  return { form: loginForm, overlayElement, elements };
}
