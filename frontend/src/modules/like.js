// インポート
import { BASE_URL } from '../baseURL.js';

export function handleLike(postElement, event) {
  const heartIcon = postElement.querySelector('.heartIcon');

  const postId = String(postElement.dataset.id);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const likesValue = postElement.querySelector('.likesValue');

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
