// インポート
import { BASE_URL } from '../../baseURL.js';
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';
import { showCenterToast } from '../utils/toast.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';
import { loginBtn } from '../utils/domElementList.js';
import { togglePasswordVisibility } from '../utils/togglePasswordVisibility.js';

// ------------------------------------------------------- //
/*      signupBtnクリック関数                                */
// ------------------------------------------------------- //

export function handleSignup(signupBtn) {
  signupBtn.addEventListener('click', () => {
    showSignupForm();
  });
}

// ------------------------------------------------------- //
/*      サインアップ関数                                      */
// ------------------------------------------------------- //

export function showSignupForm(savedValues = {}) {
  // DOM構築
  const { form: signupForm, overlayElement, elements } = createSignupForm();

  elements.signupPasswordInputToggleBtn.addEventListener('click', (e) => {
    // デフォルトのフォーム送信を防止
    e.preventDefault();

    // パスワードの表示・非表示の切り替え処理
    togglePasswordVisibility(
      elements.signupPasswordInput,
      elements.signupPasswordInputToggleBtn
    );
  });

  // 保存された値があれば入力欄にセット
  if (savedValues.userName)
    elements.signupUserNameInput.value = savedValues.userName;
  if (savedValues.userId) elements.signupUserIdInput.value = savedValues.userId;
  if (savedValues.password)
    elements.signupPasswordInput.value = savedValues.password;

  signupForm.addEventListener('submit', async (e) => {
    // デフォルトのフォーム送信を防止
    e.preventDefault();

    // 以前のエラーメッセージをリセット
    resetAllErrors(signupForm);

    // 説明文を再表示
    elements.signupUserNameDiscription.classList.add('isHidden');
    elements.signupUserIdDiscription.classList.add('isHidden');
    elements.signupPasswordDiscription.classList.add('isHidden');

    // 入力値の取得
    const signupUserNameValue = elements.signupUserNameInput.value.trim();
    const signupUserIdValue = elements.signupUserIdInput.value.trim();
    const signupPasswordValue = elements.signupPasswordInput.value.trim();
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    // ユーザーネーム、ユーザーIDの重複チェック
    const [userNameRes, userIdRes] = await Promise.all([
      fetch(
        `${BASE_URL}/users?userName=${encodeURIComponent(signupUserNameValue)}`
      ),
      fetch(
        `${BASE_URL}/users?userId=${encodeURIComponent(signupUserIdValue)}`
      ),
    ]);
    const [userNameData, userIdData] = await Promise.all([
      userNameRes.json(),
      userIdRes.json(),
    ]);

    // エラーフラグ
    let hasError = false;

    // ユーザーネームのバリデーション
    if (signupUserNameValue.length === 0) {
      showError(signupForm, '.userNameRequired', errorMessage.userNameRequired);
      elements.signupUserNameDiscription.classList.add('isHidden');
      hasError = true;
    } else if (userNameData.length > 0) {
      showError(
        signupForm,
        '.duplicateUserName',
        errorMessage.duplicateUserName
      );
      hasError = true;
    }

    // ユーザーIDのバリデーション
    if (signupUserIdValue.length === 0) {
      showError(signupForm, '.userIdRequired', errorMessage.userIdRequired);
      elements.signupUserIdDiscription.classList.add('isHidden');
      hasError = true;
    } else if (!alphanumeric.test(signupUserIdValue)) {
      showError(signupForm, '.invalidUserId', errorMessage.invalidUserId);
      hasError = true;
    } else if (signupUserIdValue.length < 5 || signupUserIdValue.length >= 15) {
      showError(
        signupForm,
        '.userIdLengthInvalid',
        errorMessage.userIdLengthInvalid
      );
      elements.signupUserIdDiscription.classList.add('isHidden');
      hasError = true;
    } else if (userIdData.length > 0) {
      showError(signupForm, '.duplicateUserId', errorMessage.duplicateUserId);
      hasError = true;
    }

    // パスワードのバリデーション
    if (signupPasswordValue.length === 0) {
      showError(signupForm, '.passwordRequired', errorMessage.passwordRequired);
      elements.signupPasswordDiscription.classList.add('isHidden');
      hasError = true;
    } else if (!alphanumeric.test(signupPasswordValue)) {
      showError(signupForm, '.invalidPassword', errorMessage.invalidPassword);
      hasError = true;
    } else if (
      signupPasswordValue.length < 5 ||
      signupPasswordValue.length >= 15
    ) {
      showError(
        signupForm,
        '.passwordLengthInvalid',
        errorMessage.passwordLengthInvalid
      );
      elements.signupPasswordDiscription.classList.add('isHidden');
      hasError = true;
    }

    // エラーがあれば処理中断
    if (hasError) return;

    // オーバーレイを閉じる
    overlayElement.remove();

    // 確認ダイアログの表示
    createConfirmDialog({
      mainMessage: '登録内容を確定しますか？',
      affirmMessage: '登録',
      clickYesBtn: async () => {
        const newUser = {
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
          likedPosts: [],
        };

        await fetch(`${BASE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        showCenterToast('登録が完了しました！');

        loginBtn.click();
      },
      clickNoBtn: () => {
        // 前の画面の入力状態を保持した状態で再表示
        showSignupForm({
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
        });
      },
    });
  });

  // オーバーレイをクリックした時の処理
  clickedOverlay(signupForm, overlayElement);
}

// ------------------------------------------------------- //
/*      DOM構築関数                                         */
// ------------------------------------------------------- //

function createSignupForm() {
  // フォーム全体
  const signupForm = createElementWithClasses('form', 'signupForm');

  const signupFormSectionTitle = createElementWithClasses(
    'h2',
    'signupFormSectionTitle'
  );
  signupFormSectionTitle.textContent = '新規登録';

  // ユーザーネーム
  const signupUserNameArea = createElementWithClasses(
    'div',
    'signupUserNameArea'
  );

  const signupUserNameAreaTitle = createElementWithClasses(
    'h3',
    'signupUserNameAreaTitle'
  );
  signupUserNameAreaTitle.textContent = 'ユーザーネーム';

  const signupUserNameInput = createElementWithClasses(
    'input',
    'signupUserNameInput'
  );
  signupUserNameInput.type = 'text';
  signupUserNameInput.maxlength = '20';

  const signupUserNameDiscription = createElementWithClasses(
    'p',
    'signupUserNameDiscription'
  );

  const userNameErrorContainer = createElementWithClasses(
    'div',
    'userNameErrorContainer'
  );

  const userNameRequired = createElementWithClasses(
    'p',
    'userNameRequired',
    'errorMessage',
    'isHidden'
  );

  const duplicateUserName = createElementWithClasses(
    'p',
    'duplicateUserName',
    'errorMessage',
    'isHidden'
  );

  // ユーザーID
  const signupUserIdArea = createElementWithClasses('div', 'signupUserIdArea');

  const signupUserIdAreaTitle = createElementWithClasses(
    'h3',
    'signupUserIdAreaTitle'
  );
  signupUserIdAreaTitle.textContent = 'ユーザーID';

  const signupUserIdInput = createElementWithClasses(
    'input',
    'signupUserIdInput'
  );
  signupUserIdInput.type = 'text';
  signupUserIdInput.maxlength = '20';

  const signupUserIdDiscription = createElementWithClasses(
    'p',
    'signupUserIdDiscription'
  );
  signupUserIdDiscription.textContent =
    '半角英数字5文字以上15文字以下で登録してください';

  const userIdErrorContainer = createElementWithClasses(
    'div',
    'userIdErrorContainer'
  );

  const userIdRequired = createElementWithClasses(
    'p',
    'userIdRequired',
    'errorMessage',
    'isHidden'
  );

  const duplicateUserId = createElementWithClasses(
    'p',
    'duplicateUserId',
    'errorMessage',
    'isHidden'
  );

  const userIdLengthInvalid = createElementWithClasses(
    'p',
    'userIdLengthInvalid',
    'errorMessage',
    'isHidden'
  );

  const invalidUserId = createElementWithClasses(
    'p',
    'invalidUserId',
    'errorMessage',
    'isHidden'
  );

  // パスワード
  const signupPasswordArea = createElementWithClasses(
    'div',
    'signupPasswordArea'
  );

  const signupPasswordAreaTitle = createElementWithClasses(
    'h3',
    'signupPasswordAreaTitle'
  );
  signupPasswordAreaTitle.textContent = 'パスワード';

  const signupPasswordWrapper = createElementWithClasses(
    'div',
    'signupPasswordWrapper'
  );

  const signupPasswordInput = createElementWithClasses(
    'input',
    'signupPasswordInput'
  );
  signupPasswordInput.type = 'password';
  signupPasswordInput.maxlength = '20';

  const signupPasswordInputToggleBtn = createElementWithClasses(
    'i',
    'signupPasswordInputToggleBtn',
    'fa-solid',
    'fa-eye'
  );

  const signupPasswordDiscription = createElementWithClasses(
    'p',
    'signupPasswordDiscription'
  );
  signupPasswordDiscription.textContent =
    '半角英数字5文字以上15文字以下で登録してください';

  const passwordErrorContainer = createElementWithClasses(
    'div',
    'passwordErrorContainer'
  );

  const passwordRequired = createElementWithClasses(
    'p',
    'passwordRequired',
    'errorMessage',
    'isHidden'
  );

  const passwordLengthInvalid = createElementWithClasses(
    'p',
    'passwordLengthInvalid',
    'errorMessage',
    'isHidden'
  );

  const invalidPassword = createElementWithClasses(
    'p',
    'invalidPassword',
    'errorMessage',
    'isHidden'
  );

  // 登録ボタン
  const signupFormInBtn = createElementWithClasses('button', 'signupFormInBtn');
  signupFormInBtn.type = 'submit';
  signupFormInBtn.textContent = '登録';

  // append処理
  signupForm.append(
    signupFormSectionTitle,
    signupUserNameArea,
    signupUserIdArea,
    signupPasswordArea,
    signupFormInBtn
  );

  signupUserNameArea.append(
    signupUserNameAreaTitle,
    signupUserNameInput,
    signupUserNameDiscription,
    userNameErrorContainer
  );
  userNameErrorContainer.append(userNameRequired, duplicateUserName);

  signupUserIdArea.append(
    signupUserIdAreaTitle,
    signupUserIdInput,
    signupUserIdDiscription,
    userIdErrorContainer
  );
  userIdErrorContainer.append(
    userIdRequired,
    userIdLengthInvalid,
    duplicateUserId,
    invalidUserId
  );

  signupPasswordArea.append(
    signupPasswordAreaTitle,
    signupPasswordInput,
    signupPasswordWrapper,
    signupPasswordDiscription,
    passwordErrorContainer
  );

  signupPasswordWrapper.append(
    signupPasswordInput,
    signupPasswordInputToggleBtn
  );

  passwordErrorContainer.append(
    passwordRequired,
    passwordLengthInvalid,
    invalidPassword
  );

  // オーバーレイ作成
  const overlayElement = createOverlayWithContent(signupForm);

  // 各要素をオブジェクトにまとめて返す
  const elements = {
    signupUserNameInput,
    signupUserIdInput,
    signupPasswordInput,
    signupUserNameDiscription,
    signupUserIdDiscription,
    signupPasswordDiscription,
    signupPasswordInputToggleBtn,
    userNameRequired,
    duplicateUserName,
    userIdRequired,
    userIdLengthInvalid,
    invalidUserId,
    duplicateUserId,
    passwordRequired,
    passwordLengthInvalid,
    invalidPassword,
  };

  return { form: signupForm, overlayElement, elements };
}
