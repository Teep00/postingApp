// インポート
import { currentDate } from '../utils/time.js';
import { handleDelete } from '../modules/delete.js';
import { handleEdit } from '../modules/edit.js';
import { handleLike } from '../modules/like.js';
import { fadeInObserver } from '../utils/fadeInObserver.js';
import { postTemplate } from '../utils/domElementList.js';

// API呼び出し
export function fetchInitialPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const postElement = createPostElement(item);
        posts.prepend(postElement);
      });
    })
    .catch((err) => console.error(err.message));
}

// 投稿の操作
export function createPostElement({ id, title, body }) {
  const postClone = postTemplate.cloneNode(true);
  postClone.classList.remove('template');
  postClone.classList.add('newPost');
  postClone.dataset.likes = '0';
  postClone.dataset.liked = 'false';

  (function textLimit(title, body) {
    let titleEl = title.slice(0, 30);
    let mainTextEl = body.slice(0, 150);

    if (title.length > 30) {
      titleEl += '...';
    }
    if (body.length > 150) {
      mainTextEl += '...';
    }

    postClone.querySelector('.title').textContent = titleEl;
    postClone.querySelector('.mainText').textContent = mainTextEl;
  })(title, body);

  getUserName(postClone);
  postClone.querySelector('.likesValue').textContent = '0';
  currentDate(postClone);

  postClone
    .querySelector('.deleteButton')
    .addEventListener('click', () => handleDelete(postClone, id));
  postClone
    .querySelector('.editButton')
    .addEventListener('click', () => handleEdit(postClone, { id }));
  postClone
    .querySelector('.likeButton')
    .addEventListener('click', () => handleLike(postClone));

  fadeInObserver.observe(postClone);

  return postClone;
}

// ユーザーネーム取得
function getUserName(post) {
  const name = faker.name.findName();
  post.querySelector('.userName').textContent = name;
}
