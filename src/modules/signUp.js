import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';

export function handleSignUp(signUpBtn) {
  signUpBtn.addEventListener('click', () => {
    const signUpForm = document.createElement('form');
    signUpForm.innerHTML = `
    <h2>新規登録</h2>
    <div>
      <p>メールアドレス</p>
      <input type="text">
    </div>
    <div>
      <p>パスワード</p>
      <input type="text">
    </div>
    <button type="button" class="signUpFormBtn">登録</button>
    `;
    signUpForm.classList.add('signUpForm');
    const overlayElement = createOverlayWithContent(signUpForm);
    clickedOverlay(signUpForm, overlayElement);
  });
}
