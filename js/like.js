export function handleLike(postElement) {
  let likes = parseInt(postElement.dataset.likes);
  const liked = postElement.dataset.liked === 'true';
  const heart = postElement.querySelector('.heart');

  likes += liked ? -1 : 1;
  postElement.dataset.liked = (!liked).toString();
  postElement.dataset.likes = likes.toString();
  postElement.querySelector('.likesValue').textContent = likes;
  heart.style.fill = liked ? '' : 'rgb(245, 51, 84)';
}
