import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';

export function handleLogin(loginBtn) {
  loginBtn.addEventListener('click', () => {
    const loginForm = document.createElement('form');
    loginForm.innerHTML = `
    <h2>ログイン</h2>
    <div>
      <p>メールアドレス</p>
      <input type="text"/>
    </div>
    <div>
      <p>パスワード</p>
      <input type="text"/>
    </div>
    <button type="button" class="loginFormBtn">ログイン</button>
    `;
    loginForm.classList.add('loginForm');
    const overlayElement = createOverlayWithContent(loginForm);
    clickedOverlay(loginForm, overlayElement);
  });
}
