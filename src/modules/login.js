import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { showCenterToast } from '../utils/toast.js';
import { myUserName, signupBtn, logoutBtn } from '../utils/domElementList.js';
import { showError, resetAllErrors } from '../utils/errorMessage.js';

export function handleLogin(loginBtn) {
  loginBtn.addEventListener('click', () => {
    const loginForm = document.createElement('form');
    loginForm.innerHTML = `
    <h2>ログイン</h2>
    <div class="loginUserIdArea">      
      <h3>ユーザーID</h3>
      <div class="loginUserIdOuter">
        <input type="text" class="loginUserId" name="userId"  maxlength="15" >
      </div>
      <div class="errorContainer">
        <p class="errorMessage isHidden userIdRequired">ユーザーIDが入力されていません</p>
      </div>
    </div>
    <div class="loginPasswordArea">
      <h3>パスワード</h3>
      <div class="loginPasswordOuter">
        <input type="password" class="loginPassword" name="password"  maxlength="15" >
        </div>
        <div class="errorContainer">
          <p class="errorMessage isHidden passwordRequired">パスワードが入力されていません</p>
        </div>
        <p class="errorMessage isHidden loginFaild">ユーザーIDまたはパスワードが間違っています</p>
      </div>
    <button type="submit" class="loginFormInBtn">ログイン</button>
    `;
    loginForm.classList.add('loginForm');
    const overlayElement = createOverlayWithContent(loginForm);

    const loginUserId = loginForm.querySelector('.loginUserId');
    const loginPassword = loginForm.querySelector('.loginPassword');

    loginForm.addEventListener('input', () => {
      loginUserId.value = loginUserId.value.replace(/[^a-zA-Z1-9]/g, '');
      loginPassword.value = loginPassword.value.replace(/[^a-zA-Z1-9]/g, '');
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      resetAllErrors(loginForm);

      const users = JSON.parse(localStorage.getItem('users')) || [];

      let hasError = false;

      if (loginUserId.value.length === 0) {
        showError(loginForm, '.userIdRequired');
        hasError = true;
      }
      if (loginPassword.value.length === 0) {
        showError(loginForm, '.passwordRequired');
        hasError = true;
      }

      const foundUser = users.find(
        (user) =>
          user.userId === loginUserId.value &&
          user.password === loginPassword.value
      );

      if (!foundUser) {
        showError(loginForm, '.loginFaild');
        hasError = true;
      }

      if (hasError) return;

      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      /*---------------- ボタンの表示・非表示切り替え ----------------- */

      operationArea.classList.remove('isHidden');
      operationArea.classList.add('isActive');

      signupBtn.classList.add('isHidden');
      signupBtn.classList.remove('isActive');

      loginBtn.classList.add('isHidden');
      loginBtn.classList.remove('isActive');

      logoutBtn.classList.remove('isHidden');
      logoutBtn.classList.add('isActive');

      /*---------------------------------------------------------- */

      overlayElement.remove();
      myUserName.textContent = foundUser.userName;
      showCenterToast(`ようこそ！${foundUser.userName}さん！`);
    });
    clickedOverlay(loginForm, overlayElement);
  });
}
