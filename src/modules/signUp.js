import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';
import { showCenterToast } from '../utils/toast.js';

export function handleSignup(signupBtn) {
  signupBtn.addEventListener('click', () => {
    showSignupForm();
  });
}

export function showSignupForm(savedValues = {}) {
  const signupForm = document.createElement('form');
  signupForm.innerHTML = `
    <h2>新規登録</h2>
    <div class="signupUserNameArea">
      <h3>ユーザーネーム</h3>
      <div class="signupUserNameOuter">
        <input type="text" class="signupUserName" name="UserName" minlength="5" maxlength="15" >
        <div class="signupUserNameInner">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userNameCheckIcon isHidden">
          <polyline points="4 12 10 17 20 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userNameCrossIcon isHidden">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
      </div>
      <div class="errorContainer">
        <p class="signupUserNameDiscription">半角英数字5文字以上<br>15文字以下で登録してください</p>
        <p class="errorMessage isHidden userNameRequired">ユーザーネームが入力されていません</p>
        <p class="errorMessage isHidden userNameTooShort">ユーザーネームは5文字以上で登録してください</p>
        <p class="errorMessage isHidden invalidUserName">ユーザーネームは半角英数字のみ使用できます</p>
        <p class="errorMessage isHidden duplicateUserName">このユーザーネームは既に使われています</p>
      </div>
    </div>
    <div class="signupUserIdArea">      
      <h3>ユーザーID</h3>
      <div class="signupUserIdOuter">
        <input type="text" class="signupUserId" name="userId" minlength="5" maxlength="15" >
        <div class="signupUserIdInner">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCheckIcon isHidden">
          <polyline points="4 12 10 17 20 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCrossIcon isHidden">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
      </div>
      <div class="errorContainer">
        <p class="signupUserIdDiscription">半角英数字5文字以上<br>15文字以下で登録してください</p>
        <p class="errorMessage isHidden userIdRequired">ユーザーIDが入力されていません</p>
        <p class="errorMessage isHidden userIdTooShort">ユーザーIDは5文字以上で登録してください</p>
        <p class="errorMessage isHidden invalidUserId">ユーザーIDは半角英数字のみ使用できます</p>
        <p class="errorMessage isHidden duplicateUserId">このユーザーIDは既に使われています</p>
      </div>
    </div>
    <div class="signupPasswordArea">
      <h3>パスワード</h3>
      <div class="signupPasswordOuter">
      <input type="password" class="signupPassword" name="password" minlength="5" maxlength="15" >
        <div class="signupPasswordInner">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="passwordCheckIcon isHidden">
          <polyline points="4 12 10 17 20 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="passwordCrossIcon isHidden">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
      </div>
      <div class="errorContainer">
        <p class="signupPasswordDiscription">半角英数字5文字以上<br>15文字以下で登録してください</p>
        <p class="errorMessage isHidden passwordRequired">パスワードが入力されていません</p>
        <p class="errorMessage isHidden passwordTooShort">パスワードは5文字以上で登録してください</p>
        <p class="errorMessage isHidden invalidPassword">パスワードは半角英数字のみ使用できます</p>
      </div>
    </div>
    <button type="submit" class="signupFormInBtn">登録</button>
    `;

  signupForm.classList.add('signupForm');
  const overlayElement = createOverlayWithContent(signupForm);

  const elements = {
    signupUserName: signupForm.querySelector('.signupUserName'),
    signupUserId: signupForm.querySelector('.signupUserId'),
    signupPassword: signupForm.querySelector('.signupPassword'),
    userNameCheckIcon: signupForm.querySelector('.userNameCheckIcon'),
    userNameCrossIcon: signupForm.querySelector('.userNameCrossIcon'),
    userIdCheckIcon: signupForm.querySelector('.userIdCheckIcon'),
    userIdCrossIcon: signupForm.querySelector('.userIdCrossIcon'),
    passwordCheckIcon: signupForm.querySelector('.passwordCheckIcon'),
    passwordCrossIcon: signupForm.querySelector('.passwordCrossIcon'),
    signupUserNameDiscription: signupForm.querySelector(
      '.signupUserNameDiscription'
    ),
    signupUserIdDiscription: signupForm.querySelector(
      '.signupUserIdDiscription'
    ),
    signupPasswordDiscription: signupForm.querySelector(
      '.signupPasswordDiscription'
    ),
    errorMessage: signupForm.querySelector('.errorMessage'),
  };

  if (savedValues.userName) elements.signupName.value = savedValues.userName;
  if (savedValues.userId) elements.signupUserId.value = savedValues.userId;
  if (savedValues.password)
    elements.signupPassword.value = savedValues.password;

  function signupInput(inputElement, checkIcon, crossIcon) {
    inputElement.addEventListener('input', () => {
      inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');
      if (inputElement.value.length === 0) {
        crossIcon.classList.add('isHidden');
        crossIcon.classList.remove('isActive');

        checkIcon.classList.add('isHidden');
        checkIcon.classList.remove('isActive');
      } else if (inputElement.value.length < 5) {
        crossIcon.classList.add('isActive');
        crossIcon.classList.remove('isHidden');

        checkIcon.classList.add('isHidden');
        checkIcon.classList.remove('isActive');
      } else {
        crossIcon.classList.add('isHidden');
        crossIcon.classList.remove('isActive');

        checkIcon.classList.add('isActive');
        checkIcon.classList.remove('isHidden');
      }
    });
  }

  signupInput(
    elements.signupUserName,
    elements.userNameCheckIcon,
    elements.userNameCrossIcon
  );
  signupInput(
    elements.signupUserId,
    elements.userIdCheckIcon,
    elements.userIdCrossIcon
  );
  signupInput(
    elements.signupPassword,
    elements.passwordCheckIcon,
    elements.passwordCrossIcon
  );

  function resetAllErrors() {
    signupForm.querySelectorAll('.errorMessage').forEach((el) => {
      el.classList.add('isHidden');
      el.classList.remove('isActive');
    });
  }

  function showError(selector) {
    const target = signupForm.querySelector(selector);
    if (target) {
      target.classList.remove('isHidden');
      target.classList.add('isActive');
    }
  }

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    resetAllErrors();

    elements.signupUserNameDiscription.classList.add('isHidden');
    elements.signupUserNameDiscription.classList.remove('isActive');
    elements.signupUserIdDiscription.classList.add('isHidden');
    elements.signupUserIdDiscription.classList.remove('isActive');
    elements.signupPasswordDiscription.classList.add('isHidden');
    elements.signupPasswordDiscription.classList.remove('isActive');

    const signupUserNameValue = elements.signupUserName.value;
    const signupUserIdValue = elements.signupUserId.value;
    const signupPasswordValue = elements.signupPassword.value;
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    let hasError = false;

    if (signupUserNameValue.length === 0) {
      showError('.userNameRequired');
      elements.signupUserNameDiscription.classList.add('isHidden');
      elements.signupUserNameDiscription.classList.remove('isActive');
      hasError = true;
    } else if (signupUserNameValue.length < 5) {
      showError('.userNameTooShort');
      elements.signupUserNameDiscription.classList.add('isHidden');
      elements.signupUserNameDiscription.classList.remove('isActive');
      hasError = true;
    }

    if (signupUserIdValue.length === 0) {
      showError('.userIdRequired');
      elements.signupUserIdDiscription.classList.add('isHidden');
      elements.signupUserIdDiscription.classList.remove('isActive');
      hasError = true;
    } else if (signupUserIdValue.length < 5) {
      showError('.userIdTooShort');
      elements.signupUserIdDiscription.classList.add('isHidden');
      elements.signupUserIdDiscription.classList.remove('isActive');
      hasError = true;
    }

    if (signupPasswordValue.length === 0) {
      showError('.passwordRequired');
      elements.signupPasswordDiscription.classList.add('isHidden');
      elements.signupPasswordDiscription.classList.remove('isActive');
      hasError = true;
    } else if (signupPasswordValue.length < 5) {
      showError('.passwordTooShort');
      elements.signupPasswordDiscription.classList.add('isHidden');
      elements.signupPasswordDiscription.classList.remove('isActive');
      hasError = true;
    }

    // 文字数が足りている場合のみ、形式エラーを表示
    if (
      !alphanumeric.test(signupUserNameValue) &&
      signupUserNameValue.length >= 5
    ) {
      showError('.invalidUserId');
      hasError = true;
    }
    if (
      !alphanumeric.test(signupUserIdValue) &&
      signupUserIdValue.length >= 5
    ) {
      showError('.invalidUserId');
      hasError = true;
    }
    if (
      !alphanumeric.test(signupPasswordValue) &&
      signupPasswordValue.length >= 5
    ) {
      showError('.invalidPassword');
      hasError = true;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const duplicateUserName = existingUsers.some(
      (user) => user.userName === signupUserNameValue
    );
    const duplicateUserId = existingUsers.some(
      (user) => user.userId === signupUserIdValue
    );

    if (duplicateUserName) {
      showError('.duplicateUserName');
      hasError = true;
    }
    if (duplicateUserId) {
      showError('.duplicateUserId');
      hasError = true;
    }

    if (hasError) return;
    overlayElement.remove();

    createConfirmDialog({
      mainMessage: '登録内容を確定しますか？',
      affirmMessage: '登録',
      clickYesBtn: () => {
        existingUsers.push({
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
        });
        localStorage.setItem('users', JSON.stringify(existingUsers));

        showCenterToast('登録が完了しました！');
      },
      clickNoBtn: () => {
        showSignupForm({
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
        });
      },
    });
  });

  clickedOverlay(signupForm, overlayElement);
}
