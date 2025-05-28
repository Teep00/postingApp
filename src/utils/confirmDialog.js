// インポート
import { createOverlayWithContent } from '../utils/overlay.js';

// 確認画面表示
export function createConfirmDialog({
  mainMessage = '確認',
  affirmMessage = 'OK',
  clickYesBtn = () => {},
  clickNoBtn = () => {},
}) {
  const confirmBox = document.createElement('div');
  confirmBox.classList.add('confirmBox');

  confirmBox.innerHTML = `
  <p>${mainMessage}</p>
  <div class="confirmButtons">
    <button class="noButton">キャンセル</button>
    <button class="yesButton">${affirmMessage}</button>
  </div>
  `;

  const overlayElement = createOverlayWithContent(confirmBox);

  confirmBox.querySelector('.yesButton').addEventListener('click', () => {
    overlayElement.remove();
    clickYesBtn();
  });

  confirmBox.querySelector('.noButton').addEventListener('click', () => {
    overlayElement.remove();
    clickNoBtn();
  });

  return overlayElement;
}
