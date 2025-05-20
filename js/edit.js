// インポート
import { createOverlayWithContent, clickedOverlay } from './overlay.js';
import { charLimit } from './charLimit.js';
import { enterKeyDown } from './keyEvent.js';
import { currentDate } from './time.js';

// 編集ボタン
export function handleEdit(postElement, { id, userId }) {
  const title = postElement.querySelector('.title').textContent;
  const mainText = postElement.querySelector('.mainText').textContent;

  const editForm = document.createElement('form');
  editForm.classList.add('editForm');
  editForm.innerHTML = `
    <h2>投稿編集</h2>
    <div><p class="editTitle">タイトル</p><input class="newTitle" placeholder="${title}"></div>
    <div class="errorContainer">
      <p id="titleError" class="errorMessage"></p>
      <p id="titleChar" class="char"></p>
    </div>
    <div><p class="editMainText">本文</p><textarea class="newMainText" placeholder="${mainText}"></textarea></div>
    <div class="errorContainer">
      <p id="mainTextError" class="errorMessage"></p>
      <p id="mainTextChar" class="char"></p>
    </div>
    <button type="submit" class="submitBtn">保存</button>
  `;

  const overlayElement = createOverlayWithContent(editForm);
  const saveButton = editForm.querySelector('button');

  const titleInput = editForm.querySelector('.newTitle');
  const mainTextInput = editForm.querySelector('.newMainText');
  const titleError = editForm.querySelector('#titleError');
  const mainTextError = editForm.querySelector('#mainTextError');
  const titleChar = editForm.querySelector('#titleChar');
  const mainTextChar = editForm.querySelector('#mainTextChar');
  const submitBtn = editForm.querySelector('.submitBtn');

  clickedOverlay(editForm, overlayElement);

  charLimit(
    titleInput,
    mainTextInput,
    titleError,
    mainTextError,
    titleChar,
    mainTextChar,
    submitBtn
  );

  enterKeyDown(editForm, submitBtn);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const newTitle = editForm.querySelector('.newTitle').value.trim() || title;
    const newMainText =
      editForm.querySelector('.newMainText').value.trim() || mainText;

    postElement.querySelector('.title').textContent = newTitle;
    postElement.querySelector('.mainText').textContent = newMainText;

    editForm.querySelector('.newTitle').placeholder = newTitle;
    editForm.querySelector('.newMainText').placeholder = newMainText;

    currentDate(postElement);
    postElement.querySelector('.edited').style.display = 'block';

    if (id > 100) {
      overlayElement.remove();
      return;
    }
    /*--- 常に新規投稿のidは101となるため、ここから先のfetchは行われない ---*/

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, body: newMainText, userId }),
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
