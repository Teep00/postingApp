// インポート
import { currentDate } from '../utils/time.js';
import { createPostForm } from '../utils/domFactory.js';
import { resetAllErrors } from '../utils/errorMessage.js';

// 編集ボタン
export function handleEdit(postElement, { id }) {
  const title = postElement.querySelector('.title').textContent;
  const mainText = postElement.querySelector('.mainText').textContent;

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

  const { newTitle, newMainText, postFormInBtn } = elements;

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetAllErrors(editForm);

    const inputTitle = newTitle.value.trim();
    const inputMainText = newMainText.value.trim();

    if (postFormInBtn.disabled) return;

    const oldTitle = postElement.querySelector('.title').textContent;
    const oldMainText = postElement.querySelector('.mainText').textContent;

    if (!inputTitle && !inputMainText) {
      overlayElement.remove();
    }

    const editedTitle = inputTitle || oldTitle;
    const editedMainText = inputMainText || oldMainText;

    postElement.querySelector('.title').textContent = editedTitle;
    postElement.querySelector('.mainText').textContent = editedMainText;

    currentDate(postElement);

    const timeArea = postElement.querySelector('.timeArea p');
    timeArea.classList.remove('isHidden');

    if (id > 100) {
      overlayElement.remove();
      return;
    }
    /*--- 常に新規投稿のidは101となるため、ここから先のfetchは行われない ---*/

    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle.value.trim(),
        body: newMainText.value.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('編集に失敗しました');
        return res.json();
      })
      .then((data) => {
        overlayElement.remove();
      })
      .catch((err) => console.error(err.message));
  });
  /*-------------------------------------------------------------*/
}
