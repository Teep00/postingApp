// export function handleLike(postElement) {
//   // let likes = parseInt(postElement.dataset.likes);
//   // const liked = postElement.dataset.liked === 'true';
//   // const heartICon = postElement.querySelector('.heartIcon');

//   // likes += liked ? -1 : 1;
//   // postElement.dataset.liked = (!liked).toString();
//   // postElement.dataset.likes = likes.toString();
//   // postElement.querySelector('.likesValue').textContent = likes;
//   // heartICon.style.color = liked ? '' : 'rgb(245, 51, 84)';

//   const postId = postElement.dataset.id;
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//   const heartIcon = postElement.querySelector('.heartIcon');
//   heartIcon.style.color = 'rgb(245, 51, 84)';

//   const likesValue = postElement.querySelector('.likesValue');
//   likesValue.textContent = parseInt(likesValue.textContent) + 1;

//   fetch(`http://localhost:3000/users/${currentUser.id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ likes: [...currentUser.likes, postId] }),
//   });

//   fetch(`http://localhost:3000/users/`);
// }

export function handleLike(postElement) {
  const postId = postElement.dataset.id;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const likesValue = postElement.querySelector('.likesValue');
  const newLikes = parseInt(likesValue.textContent) + 1;
  likesValue.textContent = newLikes;

  // 投稿データのlikesを更新
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: newLikes }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('投稿のlikes更新完了:', data);
    })
    .catch((err) => console.error('エラー:', err));

  // ユーザーの最新likesを取得してから更新
  fetch(`http://localhost:3000/users/${currentUser.id}`)
    .then((res) => res.json())
    .then((userData) => {
      const updatedLikes = [...userData.likes, postId];

      return fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: updatedLikes }),
      });
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('ユーザーのlikes更新完了:', data);
    })
    .catch((err) => console.error('エラー:', err));
}
