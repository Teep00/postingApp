// インポート
import { BASE_URL } from '../../../baseURL.js';
import { currentDate } from '../utils/time.js';
import { handleDelete } from '../modules/delete.js';
import { handleEdit } from '../modules/edit.js';
import { handleReply, showReplyList } from '../modules/reply.js';
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

  const leftBtnArea = createElementWithClasses('div', 'leftBtnArea');

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

  const reply = createElementWithClasses('div', 'reply');

  const replyBtn = createElementWithClasses(
    'i',
    'replyBtn',
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

  const showReply = createElementWithClasses('div', 'showReply');

  const showReplyText = createElementWithClasses('p', 'showReplyText');

  const timeArea = createElementWithClasses('div', 'timeArea');

  // append処理
  userInfo.append(userNameEl);
  likeBtn.append(heartIcon, likesValue, like);
  reply.append(replyBtn);
  leftBtnArea.append(likeBtn, editBtn, reply);
  buttonContainer.append(leftBtnArea, deleteBtn);
  showReply.append(showReplyText);
  post.append(
    userInfo,
    titleEl,
    mainTextEl,
    buttonContainer,
    showReply,
    timeArea
  );

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

  // いいね機能・投稿編集・投稿返信・返信欄表示・投稿削除
  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleLike(post);
  });
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleEdit(post);
  });
  replyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleReply(post);
  });
  post.addEventListener('click', () => {
    // 投稿のテキストがドラッグされている際、クリックイベントは発生しない
    const selection = window.getSelection();
    // 条件式 selecitonは古いバージョンの後方互換性のために記述
    if (selection && selection.toString().length > 0) {
      return;
    }
    showReplyList(post);
  });
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleDelete(post);
  });

  // 新しい投稿を先頭に追加
  posts.prepend(post);

  // 投稿のフェードイン
  fadeInObserver.observe(post);

  return post;
}
