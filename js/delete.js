// インポート
import { createOverlayWithContent } from './overlay.js';

// 削除ボタン
export function handleDelete(postElement, id) {
  const deleteBtn = postElement.querySelector('.deleteButton');
  createConfirmDialog('本当に削除しますか？', () => {
    deleteBtn.textContent = '削除中...';
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('削除に失敗しました');
        postElement.remove();
      })
      .catch((err) => {
        alert(err.message);
        deleteBtn.textContent = '削除';
      });
  });
}

// 削除ボタンを押した時のポップアップ
export function createConfirmDialog(message, onConfirm) {
  const confirmBox = document.createElement('div');
  confirmBox.classList.add('confirmBox');

  confirmBox.innerHTML = `
  <p>${message}</p>
  <div class="confirmButtons">
    <button class="noButton">キャンセル</button>
    <button class="yesButton">削除</button>
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
}
