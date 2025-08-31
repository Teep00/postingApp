// インポート
import { BASE_URL } from '../../baseURL.js';

// ------------------------------------------------------- //
/*      いいね機能関数                                       */
// ------------------------------------------------------- //

export function handleLike(postElement) {
  const heartIcon = postElement.querySelector('.heartIcon');

  const likesValue = postElement.querySelector('.likesValue');

  // 投稿IDと現在のユーザー情報を取得
  const postId = String(postElement.dataset.id);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // サーバーにPATCHリクエストを送信していいねを更新
  fetch(`${BASE_URL}/posts/${postId}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: currentUser.userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      likesValue.textContent = data.likes;
      currentUser.likedPosts = data.likedPosts;

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      if (currentUser.likedPosts.includes(String(postId))) {
        heartIcon.classList.add('liked');
      } else {
        heartIcon.classList.remove('liked');
      }
    })
    .catch((err) => console.error('エラー:', err));
}
