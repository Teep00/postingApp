// インポート
import { BASE_URL } from '../../../baseURL.js';
import { currentDate } from '../utils/time.js';
import { handleDelete } from '../modules/delete.js';
import { handleEdit } from '../modules/edit.js';
import { handleLike } from '../modules/like.js';
import { fadeInObserver } from '../utils/fadeInObserver.js';
import { posts } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { likeButtonDisabled } from '../utils/likeButtonDisabled.js';

// ------------------------------------------------------- //
/*      投稿の初期表示関数                                    */
// ------------------------------------------------------- //

export function fetchInitialPosts() {
  fetch(`${BASE_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      data.forEach((item) => {
        const postElement = createPostElement(item);
        posts.prepend(postElement);
      });

      postsButtonVisibility(!!currentUser);
      likeButtonDisabled();
    })

    .catch((err) => console.error(err.message));
}

// ------------------------------------------------------- //
/*      投稿操作関数                                         */
// ------------------------------------------------------- //

export function createPostElement({
  id,
  title,
  body,
  userName,
  createdAt,
  likes,
  edited,
}) {
  // ログイン中のユーザー情報を取得
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // DOM構築
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

  // いいね済みの場合はハートを赤くする
  if (currentUser && currentUser.likedPosts.includes(String(id))) {
    heartIcon.classList.add('liked');
  } else {
    heartIcon.classList.remove('liked');
  }

  const likesValue = createElementWithClasses('span', 'likesValue');
  likesValue.textContent = likes || 0;

  const like = createElementWithClasses('p', 'like');
  like.textContent = 'いいね';

  const editBtn = createElementWithClasses('button', 'editButton', 'isHidden');
  editBtn.type = 'button';
  editBtn.textContent = '編集';

  const replyBtn = createElementWithClasses('button', 'replyBtn');
  replyBtn.type = 'button';

  const replyIcon = createElementWithClasses(
    'i',
    'reply',
    'fa-solid',
    'fa-reply'
  );

  const deleteBtn = createElementWithClasses(
    'i',
    'deleteButton',
    'fa-solid',
    'fa-trash-can',
    'isHidden'
  );

  const timeArea = createElementWithClasses('div', 'timeArea');

  // append処理
  post.append(userInfo, titleEl, mainTextEl, buttonContainer, timeArea);
  userInfo.append(userNameEl);
  buttonContainer.append(likeEditArea, deleteBtn);
  likeEditArea.append(likeBtn, editBtn);
  likeBtn.append(heartIcon, likesValue, like);

  const name = post.querySelector('.userName');
  name.textContent = userName;

  // 投稿時刻
  currentDate(createdAt, post);

  // 投稿が編集されている場合は編集済みと表示
  if (edited) {
    const edited = post.querySelector('.edited');
    edited.classList.remove('isHidden');
  }

  // dataset設定
  post.dataset.likes = likes || 0;
  post.dataset.id = id;
  post.dataset.name = name.textContent;

  // 文字数制限
  (function textLimit(title, body) {
    const titleEl = post.querySelector('.title');
    const mainTextEl = post.querySelector('.mainText');

    titleEl.textContent =
      title.length > 30 ? title.slice(0, 30) + '...' : title;
    mainTextEl.textContent =
      body.length > 150 ? body.slice(0, 150) + '...' : body;
  })(title, body);

  // 投稿削除・投稿編集・いいね機能
  deleteBtn.addEventListener('click', () => handleDelete(post));
  editBtn.addEventListener('click', () => handleEdit(post));
  likeBtn.addEventListener('click', () => handleLike(post));

  // 新しい投稿を先頭に追加
  posts.prepend(post);

  // 投稿のフェードイン
  fadeInObserver.observe(post);

  return post;
}
