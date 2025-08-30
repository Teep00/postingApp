// インポート
import { BASE_URL } from '../core/baseURL.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';

// ------------------------------------------------------- //
/*      投稿削除関数                                         */
// ------------------------------------------------------- //

export function handleDelete(postElement) {
  const deleteBtn = postElement.querySelector('.deleteButton');
  createConfirmDialog({
    mainMessage: '本当に削除しますか？',
    affirmMessage: '削除',
    clickYesBtn: () => {
      fetch(`${BASE_URL}/posts/${postElement.dataset.id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('削除に失敗しました');
          postElement.remove();
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    clickNoBtn: () => {},
  });
}
