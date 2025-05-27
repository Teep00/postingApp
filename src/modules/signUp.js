import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';

export function handleSignUp(signupBtn) {
  signupBtn.addEventListener('click', () => {
    const signupForm = document.createElement('form');
    signupForm.innerHTML = `
    <h2>新規登録</h2>
    <div class="signupUserIdArea">      

      <h3>ユーザーID</h3>
      <div class="signupUserIdOuter">
        <input type="text" class="signupUserId" name="userId" minlength="5" maxlength="15" >
        <div class="signupUserIdInner">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCheckIcon">
          <polyline points="4 12 10 17 20 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCrossIcon">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
      </div>
      <div class="errorContainer">
        <p class="signupUserIdDiscription">半角英数字5文字以上<br>15文字以下で登録してください</p>
        <p class="errorMessage userIdRequired hidden">ユーザーIDが入力されていません</p>
        <p class="errorMessage userIdTooShort hidden">ユーザーIDは5文字以上で登録してください</p>
        <p class="errorMessage invalidUserId hidden">ユーザーIDは半角英数字のみ使用できます</p>
        <p class="errorMessage duplicateUserId hidden">このユーザーIDは既に使われています</p>
      </div>
    </div>
    <div class="signupPasswordArea">
      <h3>パスワード</h3>
      <div class="signupPasswordOuter">
      <input type="password" class="signupPassword" name="password" minlength="5" maxlength="15" >
        <div class="signupPasswordInner">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="passwordCheckIcon">
          <polyline points="4 12 10 17 20 6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="passwordCrossIcon">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </div>
      </div>
      <div class="errorContainer">
        <p class="signupPasswordDiscription">半角英数字5文字以上<br>15文字以下で登録してください</p>
        <p class="errorMessage passwordRequired hidden">パスワードが入力されていません</p>
        <p class="errorMessage passwordTooShort hidden">パスワードは5文字以上で登録してください</p>
        <p class="errorMessage invalidPassword hidden">パスワードは半角英数字のみ使用できます</p>
      </div>
    </div>
    <button type="submit" class="signupFormInBtn">登録</button>
    `;

    signupForm.classList.add('signupForm');
    const overlayElement = createOverlayWithContent(signupForm);

    const elements = {
      signupUserId: signupForm.querySelector('.signupUserId'),
      signupPassword: signupForm.querySelector('.signupPassword'),
      userIdCheckIcon: signupForm.querySelector('.userIdCheckIcon'),
      userIdCrossIcon: signupForm.querySelector('.userIdCrossIcon'),
      passwordCheckIcon: signupForm.querySelector('.passwordCheckIcon'),
      passwordCrossIcon: signupForm.querySelector('.passwordCrossIcon'),
      signupUserIdDiscription: signupForm.querySelector(
        '.signupUserIdDiscription'
      ),
      signupPasswordDiscription: signupForm.querySelector(
        '.signupPasswordDiscription'
      ),
      signupUserIdError: signupForm.querySelector('#signupUserIdError'),
      signupPasswordError: signupForm.querySelector('#signupPasswordError'),
    };

    function signupInput(inputElement, checkIcon, crossIcon) {
      inputElement.addEventListener('input', () => {
        inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');
        if (inputElement.value.length === 0) {
          crossIcon.style.display = 'none';
          checkIcon.style.display = 'none';
        } else if (inputElement.value.length < 5) {
          crossIcon.style.display = 'block';
          checkIcon.style.display = 'none';
        } else {
          crossIcon.style.display = 'none';
          checkIcon.style.display = 'block';
        }
      });
    }

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

    function showError(selector) {
      document.querySelector(selector).classList.remove('hidden');
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      signupForm
        .querySelectorAll('.errorMessage')
        .forEach((el) => el.classList.add('hidden'));

      elements.signupUserIdDiscription.style.display = 'block';
      elements.signupPasswordDiscription.style.display = 'block';

      const signupUserIdValue = elements.signupUserId.value;
      const signupPasswordValue = elements.signupPassword.value;
      const alphanumeric = /^[a-zA-Z0-9]+$/;

      let hasError = false;

      if (signupUserIdValue.length === 0) {
        showError('.userIdRequired');
        elements.signupUserIdDiscription.style.display = 'none';
        hasError = true;
      } else if (signupUserIdValue.length < 5) {
        showError('.userIdTooShort');
        elements.signupUserIdDiscription.style.display = 'none';
        hasError = true;
      }

      if (signupPasswordValue.length === 0) {
        showError('.passwordRequired');
        elements.signupPasswordDiscription.style.display = 'none';
        hasError = true;
      } else if (signupPasswordValue.length < 5) {
        showError('.passwordTooShort');
        elements.signupPasswordDiscription.style.display = 'none';
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

      if (hasError) return;

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const duplicateUserId = existingUsers.some(
        (user) => user.userId === signupUserIdValue
      );

      if (duplicateUserId) {
        showError('.duplicateUserId');
        hasError = true;
      }

      overlayElement.remove();

      createConfirmDialog('登録内容を確定しますか？', '登録', () => {
        existingUsers.push({
          userId: signupUserIdValue,
          password: signupPasswordValue,
        });
        localStorage.setItem('users', JSON.stringify(existingUsers));
      });
    });

    clickedOverlay(signupForm, overlayElement);
  });
}

{
  /* <h3>ユーザーネーム</h3>
<div class="signupUserIdOuter">
  <input type="text" class="signupUserId" name="userId" minlength="5" maxlength="15" >
  <div class="signupUserIdInner">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCheckIcon">
    <polyline points="4 12 10 17 20 6" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#dc3545" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="userIdCrossIcon">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  </div>
</div> */
}
