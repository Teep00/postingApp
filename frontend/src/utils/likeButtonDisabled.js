// インポート
import { getAllPosts } from './allPost.js';

// ------------------------------------------------------- //
/*      いいねボタン有効化・無効化切り替え関数                   */
// ------------------------------------------------------- //

export function likeButtonDisabled() {
  // ローカルストレージから現在のユーザー情報を取得
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // 全ての投稿を取得
  const posts = getAllPosts();

  // 各投稿に対していいねボタンの有効化・無効化を切り替え
  posts.forEach((post) => {
    const likeBtn = post.querySelector('.likeButton');
    const heartIcon = post.querySelector('.heartIcon');

    if (!likeBtn || !heartIcon) return;

    if (!currentUser) {
      likeBtn.disabled = true;
      likeBtn.style.cursor = 'auto';
      heartIcon.classList.add('isHidden');
    } else {
      likeBtn.disabled = false;
      likeBtn.style.cursor = 'pointer';
      heartIcon.classList.remove('isHidden');
    }
  });
}
