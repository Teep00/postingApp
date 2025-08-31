// インポート
import { BASE_URL } from '../../baseURL.js';
import { createPostElement } from '../core/postManager.js';
import { createPostForm } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { scrollToTop } from '../utils/scrollToTop.js';

// ------------------------------------------------------- //
/*      新規投稿作成関数                                      */
// ------------------------------------------------------- //

export function newPostCreate(newPostCreateBtn) {
  newPostCreateBtn.addEventListener('click', () => {
    // DOM構築
    const { form: postForm, overlayElement, elements } = createPostForm();
    const { newTitle, newMainText, postFormInBtn } = elements;

    // 送信ボタンをクリックしたときの処理
    postFormInBtn.addEventListener('click', (e) => {
      // デフォルトのフォーム送信を防止
      e.preventDefault();

      // 以前のエラーメッセージをリセット
      resetAllErrors(postForm);

      // 入力値を取得
      const title = newTitle.value;
      const body = newMainText.value;

      // エラーフラグ
      let hasError = false;

      // タイトルと本文が空の場合はエラー
      if (!title) {
        showError(postForm, '.titleRequired', errorMessage.titleRequired);
        hasError = true;
      }
      if (!body) {
        showError(postForm, '.mainTextRequired', errorMessage.mainTextRequired);
        hasError = true;
      }

      // ランダムなIDを生成
      const id = Math.random().toString(36).slice(-8);

      // エラーがある場合は送信しない
      if (hasError) return;

      // タイトルか本文が文字数制限を超えている場合は送信ボタンを無効化
      if (postFormInBtn.disabled) return;

      // ログイン中のユーザー情報を取得
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      // 投稿を作成してサーバーのデータを更新
      fetch(`${BASE_URL}/posts`, {
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
          });
          postsButtonVisibility(true);
          overlayElement.remove();

          scrollToTop();
        })
        .catch((err) => console.error(err.message));
    });
  });
}
