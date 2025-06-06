// インポート
import { currentDate } from '../utils/time.js';
import { handleDelete } from '../modules/delete.js';
import { handleEdit } from '../modules/edit.js';
import { handleLike } from '../modules/like.js';
import { fadeInObserver } from '../utils/fadeInObserver.js';
import { posts } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import { postsButtonVisibility } from '../utils/postView.js';

// API呼び出し
export function fetchInitialPosts() {
  fetch('http://localhost:3000/posts')
    .then((res) => res.json())
    .then((data) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      data.forEach((item) => {
        const postElement = createPostElement(item);
        posts.prepend(postElement);
      });

      postsButtonVisibility(!!currentUser);
    })
    .catch((err) => console.error(err.message));
}

// 投稿の操作
export function createPostElement({ id, title, body, userName }) {
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

  post.appendChild(userInfo);
  userInfo.appendChild(userNameEl);
  post.appendChild(titleEl);
  post.appendChild(mainTextEl);
  post.appendChild(buttonContainer);
  buttonContainer.appendChild(likeEditArea);
  likeEditArea.appendChild(likeBtn);
  likeBtn.appendChild(heartIcon);
  likeBtn.appendChild(likesValue);
  likeBtn.appendChild(like);
  likeEditArea.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);
  post.appendChild(timeArea);

  const actualUserName = getUserName(post, userName);

  currentDate(post);

  post.dataset.likes = '0';
  post.dataset.liked = 'false';
  post.dataset.id = id;
  post.dataset.name = actualUserName;

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

// ユーザーネーム取得
function getUserName(post, userName) {
  const createName = faker.name.findName();
  const thisName = post.querySelector('.userName');

  thisName.textContent = userName ?? createName;

  return thisName.textContent;
}
