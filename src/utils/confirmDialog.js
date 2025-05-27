// インポート
import { createOverlayWithContent } from '../utils/overlay.js';

// 確認画面表示
export function createConfirmDialog(mainMessage, affirm, onConfirm) {
  const confirmBox = document.createElement('div');
  confirmBox.classList.add('confirmBox');

  confirmBox.innerHTML = `
  <p>${mainMessage}</p>
  <div class="confirmButtons">
    <button class="noButton">キャンセル</button>
    <button class="yesButton">${affirm}</button>
  </div>
  `;

  const overlayElement = createOverlayWithContent(confirmBox);

  confirmBox.querySelector('.noButton').addEventListener('click', () => {
    overlayElement.remove();
  });

  confirmBox.querySelector('.yesButton').addEventListener('click', () => {
    onConfirm();
    overlayElement.remove();
  });

  console.log('hello');
}
