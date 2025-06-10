export function likeButtonDisabled() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const posts = document.querySelectorAll('.post');

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
