// インポート
import { currentDate } from '../../src/utils/time.js';
import { handleDelete } from '../../src/modules/delete.js';
import { handleEdit } from '../../src/modules/edit.js';
import { handleLike } from '../../src/modules/like.js';
import { fadeInObserver } from '../../src/utils/fadeInObserver.js';
import { posts } from '../../src/utils/domElementList.js';
import { createElementWithClasses } from '../../src/utils/domFactory.js';
import { postsButtonVisibility } from '../../src/utils/postView.js';
import { likeButtonDisabled } from '../../src/utils/likeButtonDisabled.js';

export function fetchInitialPosts() {
  fetch('http://localhost:3000/posts')
    .then((res) => res.json())
    .then((data) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      // const postIds = data.map((item) => item.id);
      // localStorage.setItem('postIds', JSON.stringify(postIds));

      data.forEach((item) => {
        const postElement = createPostElement(item);
        posts.prepend(postElement);
      });

      postsButtonVisibility(!!currentUser);
      likeButtonDisabled();
    })
    .catch((err) => console.error(err.message));
}

// 投稿の操作
export function createPostElement({ id, title, body, userName, createdAt }) {
  /*---------------------- DOM構築 ----------------------*/

  const post = createElementWithClasses('div', 'post', 'box');

  const userInfo = createElementWithClasses('div', 'userInfo');

  const userNameEl = createElementWithClasses('p', 'userName');

  const titleEl = createElementWithClasses('h4', 'title');

  const mainTextEl = createElementWithClasses('p', 'mainText');

  const buttonContainer = createElementWithClasses('div', 'buttonContainer');

  const likeEditArea = createElementWithClasses('div', 'likeEditArea');

  const likeBtn = createElementWithClasses('button', 'likeButton');
  likeBtn.type = 'button';

  const heartIcon = createElementWithClasses(
    'i',
    'heartIcon',
    'fa-solid',
    'fa-heart'
  );

  const likesValue = createElementWithClasses('span', 'likesValue');
  likesValue.textContent = '0';

  const like = createElementWithClasses('p', 'like');
  like.textContent = 'いいね';

  const editBtn = createElementWithClasses('button', 'editButton', 'isHidden');
  editBtn.type = 'button';
  editBtn.textContent = '編集';

  const deleteBtn = createElementWithClasses(
    'i',
    'deleteButton',
    'fa-solid',
    'fa-trash-can',
    'isHidden'
  );

  const timeArea = createElementWithClasses('div', 'timeArea');

  /*----------------------------------------------------*/

  post.append(userInfo, titleEl, mainTextEl, buttonContainer, timeArea);
  userInfo.append(userNameEl);
  buttonContainer.append(likeEditArea, deleteBtn);
  likeEditArea.append(likeBtn, editBtn);
  likeBtn.append(heartIcon, likesValue, like);

  const name = post.querySelector('.userName');
  name.textContent = userName;

  currentDate(createdAt, post);

  post.dataset.likes = '0';
  post.dataset.liked = 'false';
  post.dataset.id = id;
  post.dataset.name = name.textContent;

  (function textLimit(title, body) {
    const titleEl = post.querySelector('.title');
    const mainTextEl = post.querySelector('.mainText');

    titleEl.textContent =
      title.length > 30 ? title.slice(0, 30) + '...' : title;
    mainTextEl.textContent =
      body.length > 150 ? body.slice(0, 150) + '...' : body;
  })(title, body);

  deleteBtn.addEventListener('click', () => handleDelete(post, id));
  editBtn.addEventListener('click', () => handleEdit(post, { id }));
  likeBtn.addEventListener('click', () => handleLike(post));

  posts.prepend(post);

  fadeInObserver.observe(post);

  return post;
}
