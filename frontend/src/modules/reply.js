// インポート
import { BASE_URL } from '../../baseURL.js';
import {
  posts,
  showAll,
  newPostCreateBtn,
  sort,
  search,
  signupBtn,
  loginBtn,
  replyPost,
} from '../utils/domElementList.js';
import { createPostElement } from '../core/postManager.js';
import { fadeInObserver } from '../utils/fadeInObserver.js';
import { createPostForm, preparePostData } from '../utils/domFactory.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { scrollToTop } from '../utils/scrollToTop.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';

export function handleReply(post) {
  const {
    form: replyForm,
    overlayElement,
    elements,
  } = createPostForm({ sectionTitleText: '投稿返信' });

  const { newTitle, newMainText, postFormInBtn } = elements;

  postFormInBtn.addEventListener('click', (e) => {
    // デフォルトのフォーム送信を防止
    e.preventDefault();

    // 共通処理の関数化
    const result = preparePostData(
      replyForm,
      newTitle,
      newMainText,
      postFormInBtn
    );

    // バリデーション失敗時は処理を中断
    if (!result) return;

    const { title, body } = result;

    const id = Math.random().toString(36).slice(-8);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 投稿を作成してサーバーのデータを更新
    fetch(`${BASE_URL}/replies/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        title,
        body,
        userName: currentUser.userName,
        userId: currentUser.userId,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedUsers: [],
        edited: false,
        replyTo: post.dataset.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        createPostElement({
          ...data,
          userName: currentUser.userName,
          userId: currentUser.userId,
          createdAt: new Date().toISOString(),
          likes: 0,
          likedUsers: [],
          edited: false,
          replyTo: post.dataset.id,
        });

        overlayElement.remove();
        showReplyList(post);
      })
      .catch((err) => console.error(err.message));
  });
}

export function showReplyList(post) {
  const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!getCurrentUser) {
    createConfirmDialog({
      mainMessage: 'ログインまたは新規登録をしてください',
      affirmMessage: 'ログイン',
      denyMessage: '新規登録',
      clickYesBtn: () => {
        loginBtn.click();
      },
      clickNoBtn: () => {
        signupBtn.click();
      },
    });
    return;
  }

  fetch(`${BASE_URL}/replies/${post.dataset.id}/showReplyList`)
    .then((res) => res.json())
    .then((data) => {
      posts.innerHTML = '';
      data.replies.forEach((item) => {
        createPostElement(item);
      });
      showAll.classList.remove('isHidden');

      const { userName, title, body } = data.post;
      replyPost.querySelector('.replyUserName').textContent = userName;
      replyPost.querySelector('.replyTitle').textContent = title;
      replyPost.querySelector('.replyBody').textContent = body;

      replyPost.classList.remove('isHidden');
      fadeInObserver.observe(replyPost);
      postsButtonVisibility(true);
    });
  showAll.addEventListener('click', () => {
    replyPost.classList.add('isHidden');
    replyPost.classList.remove('visible');

    newPostCreateBtn.classList.remove('isHidden');
    sort.classList.remove('isHidden');
    search.classList.remove('isHidden');
  });
  newPostCreateBtn.classList.add('isHidden');
  sort.classList.add('isHidden');
  search.classList.add('isHidden');

  scrollToTop();
}
