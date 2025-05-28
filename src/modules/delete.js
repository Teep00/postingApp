// インポート
import { createConfirmDialog } from '../utils/confirmDialog.js';

// 削除ボタン
export function handleDelete(postElement, id) {
  const deleteBtn = postElement.querySelector('.deleteButton');
  createConfirmDialog({
    mainMessage: '本当に削除しますか？',
    affirmMessage: '削除',
    clickYesBtn: () => {
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
    },
    clickNoBtn: () => {},
  });
}
