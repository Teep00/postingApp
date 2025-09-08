// インポート
import { BASE_URL } from '../../baseURL.js';
import { createPostElement } from '../core/postManager.js';
import { createPostForm, preparePostData } from '../utils/domFactory.js';
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

      // 共通処理の関数化
      const result = preparePostData(
        postForm,
        newTitle,
        newMainText,
        postFormInBtn
      );

      // バリデーション失敗時は処理を中断
      if (!result) return;

      const { title, body } = result;

      // ランダムなIDを生成
      const id = Math.random().toString(36).slice(-8);

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
