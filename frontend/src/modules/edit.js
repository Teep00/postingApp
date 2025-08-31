// インポート
import { BASE_URL } from '../../baseURL.js';
import { createPostForm } from '../utils/domFactory.js';
import { resetAllErrors } from '../utils/errorMessage.js';

// ------------------------------------------------------- //
/*      投稿編集関数                                         */
// ------------------------------------------------------- //

export function handleEdit(postElement) {
  // 既存のタイトルと本文を取得
  const title = postElement.querySelector('.title').textContent;
  const mainText = postElement.querySelector('.mainText').textContent;

  // DOM構築
  const {
    form: editForm,
    overlayElement,
    elements,
  } = createPostForm({
    sectionTitleText: '投稿編集',
    placeholderTitle: title,
    placeholderMainText: mainText,
    submitText: '保存',
  });

  // フォームの要素を取得
  const { newTitle, newMainText, postFormInBtn } = elements;

  // 既存のタイトルと本文をフォームにセット
  elements.newTitle.value = title;
  elements.newMainText.value = mainText;

  // 保存ボタンをクリックしたときの処理
  postFormInBtn.addEventListener('click', (e) => {
    // デフォルトのフォーム送信を防止
    e.preventDefault();

    // 以前のエラーメッセージをリセット
    resetAllErrors(editForm);

    // 入力値を取得
    const inputTitle = newTitle.value;
    const inputMainText = newMainText.value;

    // タイトルか本文が文字数制限を超えている場合は保存ボタンを無効化
    if (postFormInBtn.disabled) return;

    // タイトルと本文が両方とも空の場合はオーバーレイを閉じる
    if (!inputTitle && !inputMainText) {
      overlayElement.remove();
    }

    // 変更されていない場合は元の値を使用
    const editedTitle = inputTitle || title;
    const editedMainText = inputMainText || mainText;

    // タイトルと本文が両方とも変更されていない場合は、
    //'編集後'という表示を出さずにオーバーレイを閉じる
    if (inputTitle === title && inputMainText === mainText) {
      overlayElement.remove();
      return;
    }

    // 投稿を編集してサーバーのデータを更新
    fetch(`${BASE_URL}/posts/${postElement.dataset.id}/edit`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editedTitle,
        body: editedMainText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        postElement.querySelector('.title').textContent = data.title;
        postElement.querySelector('.mainText').textContent = data.body;
        postElement.querySelector('.edited').classList.remove('isHidden');
        overlayElement.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
