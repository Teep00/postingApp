export function handleLike(postElement) {
  let likes = parseInt(postElement.dataset.likes);
  const liked = postElement.dataset.liked === 'true';
  const heartICon = postElement.querySelector('.heartIcon');

  likes += liked ? -1 : 1;
  postElement.dataset.liked = (!liked).toString();
  postElement.dataset.likes = likes.toString();
  postElement.querySelector('.likesValue').textContent = likes;
  heartICon.style.color = liked ? '' : 'rgb(245, 51, 84)';
}
