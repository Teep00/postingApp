// インポート
import { createOverlayWithContent, clickedOverlay } from './overlay.js';

// ------------------------------------------------------- //
/*      確認画面表示関数                                      */
// ------------------------------------------------------- //

export function createConfirmDialog({
  mainMessage = '確認',
  affirmMessage = 'OK',
  denyMessage = 'キャンセル',
  clickYesBtn = () => {},
  clickNoBtn = () => {},
}) {
  const confirmBox = document.createElement('div');
  confirmBox.classList.add('confirmBox');

  confirmBox.innerHTML = `
  <p>${mainMessage}</p>
  <div class="confirmButtons">
    <button class="noButton">${denyMessage}</button>
    <button class="yesButton">${affirmMessage}</button>
  </div>
  `;

  const overlayElement = createOverlayWithContent(confirmBox);

  confirmBox.querySelector('.yesButton').addEventListener('click', (e) => {
    e.preventDefault();
    overlayElement.remove();
    clickYesBtn();
  });

  confirmBox.querySelector('.noButton').addEventListener('click', () => {
    overlayElement.remove();
    clickNoBtn();
  });

  clickedOverlay(confirmBox, overlayElement);
  return overlayElement;
}
