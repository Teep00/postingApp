// インポート
import { currentDate } from '../utils/time.js';
import { handleDelete } from '../modules/delete.js';
import { handleEdit } from '../modules/edit.js';
import { handleLike } from '../modules/like.js';
import { fadeInObserver } from '../utils/fadeInObserver.js';
import { posts } from '../utils/domElementList.js';
import {
  createElementWithClasses,
  createButtonField,
} from '../utils/domFactory.js';

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
export function createPostElement({ id, title, body, userName }) {
  /*---------------------- DOM構築 ----------------------*/

  const newPost = createElementWithClasses('div', 'newPost', 'box');

  const userInfo = createElementWithClasses('div', 'userInfo');

  const userNameEl = createElementWithClasses('p', 'userName');

  const titleEl = createElementWithClasses('h4', 'title');

  const mainTextEl = createElementWithClasses('p', 'mainText');

  const buttonContainer = createElementWithClasses(
    'div',
    'buttonContainer',
    'isHidden'
  );

  const likeEditArea = createElementWithClasses('div', 'likeEditArea');

  const likeBtn = createButtonField({ type: 'button', classes: 'likeButton' });

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

  const editBtn = createButtonField({ type: 'button', classes: 'editButton' });
  editBtn.textContent = '編集';

  const deleteBtn = createElementWithClasses(
    'i',
    'deleteBtn',
    'fa-solid',
    'fa-trash-can'
  );

  const timeArea = createElementWithClasses('div', 'timeArea');

  /*----------------------------------------------------*/

  newPost.appendChild(userInfo);
  userInfo.appendChild(userNameEl);
  newPost.appendChild(titleEl);
  newPost.appendChild(mainTextEl);
  newPost.appendChild(buttonContainer);
  buttonContainer.appendChild(likeEditArea);
  likeEditArea.appendChild(likeBtn);
  likeBtn.appendChild(heartIcon);
  likeBtn.appendChild(likesValue);
  likeBtn.appendChild(like);
  likeEditArea.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);
  newPost.appendChild(timeArea);

  newPost.dataset.likes = '0';
  newPost.dataset.liked = 'false';
  newPost.dataset.id = id;

  (function textLimit(title, body) {
    const titleEl = newPost.querySelector('.title');
    const mainTextEl = newPost.querySelector('.mainText');

    titleEl.textContent =
      title.length > 30 ? title.slice(0, 30) + '...' : title;
    mainTextEl.textContent =
      body.length > 150 ? body.slice(0, 150) + '...' : body;
  })(title, body);

  getUserName(newPost, userName);
  currentDate(newPost);

  deleteBtn.addEventListener('click', () => handleDelete(newPost, id));
  editBtn.addEventListener('click', () => handleEdit(newPost, { id }));
  likeBtn.addEventListener('click', () => handleLike(newPost));

  posts.prepend(newPost);

  fadeInObserver.observe(newPost);

  return newPost;
}

// ユーザーネーム取得
function getUserName(post, userName) {
  const name = faker.name.findName();
  post.querySelector('.userName').textContent = userName ?? name;
}

// newPost.innerHTML = `
// <div class="userInfo">
//   <p class="userName"></p>
// </div>
// <h4 class="title"></h4>
// <p class="mainText"></p>
// <div id="buttonContainer">
//   <div class="like-editArea">
//     <button type="button" class="likeButton">
//       <svg
//         class="heart"
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="gray"
//       >
//         <path
//           d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
//             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
//             C13.09 3.81 14.76 3 16.5 3
//             19.58 3 22 5.42 22 8.5
//             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//         />
//       </svg>
//       <span class="likesValue"></span>
//       いいね
//     </button>
//     <button class="editButton isHidden">編集</button>
//   </div>
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     class="deleteButton isHidden"
//   >
//     <g fill="none" stroke="rgb(90, 90, 90)" stroke-width="2">
//       <path d="M3 6h18" stroke-linecap="round" />
//       <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
//       <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
//       <path d="M10 11v6" stroke-linecap="round" />
//       <path d="M14 11v6" stroke-linecap="round" />
//     </g>
//   </svg>
// </div>
// <div class="timeArea"></div>
// `;
