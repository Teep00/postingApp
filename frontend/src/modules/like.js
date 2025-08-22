export function handleLike(postElement, event) {
  const postId = postElement.dataset.id;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const likesValue = postElement.querySelector('.likesValue');

  fetch(`http://localhost:3000/posts/${postId}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: currentUser.userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('投稿データを更新:', data);
      likesValue.textContent = data.likes;
    })
    .catch((err) => console.error('エラー:', err));
}
