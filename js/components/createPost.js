import { createOverlayWithContent, clickedOverlay } from './overlay.js';
import { charLimit } from '../utils/charLimit.js';
import { enterKeyDown } from '../utils/keyEvent.js';
import { createPostElement } from './postUtils.js';

// 新規投稿作成
export function newPostCreate(newPostCreateBtn, incrementUserId, getUserId) {
  newPostCreateBtn.addEventListener('click', () => {
    const postForm = document.createElement('form');
    postForm.classList.add('postForm');
    postForm.innerHTML = `
    <h2>新規投稿</h2>
    <input type="text" placeholder="タイトル" class="newTitle" name="newTitle"/>
    <div class="errorContainer">
      <p id="titleError" class="errorMessage"></p>
      <p id="titleChar" class="char"></p>
    </div>
    <textarea placeholder="本文" class="newMainText" name="newBody" ></textarea>
    <div class="errorContainer">
      <p id="mainTextError" class="errorMessage"></p>
      <p id="mainTextChar" class="char"></p>
    </div>
    <button type="submit">送信</button>
  `;

    const overlayElement = createOverlayWithContent(postForm);

    const titleInput = postForm.querySelector('.newTitle');
    const mainTextInput = postForm.querySelector('.newMainText');
    const titleError = postForm.querySelector('#titleError');
    const mainTextError = postForm.querySelector('#mainTextError');
    const titleChar = postForm.querySelector('#titleChar');
    const mainTextChar = postForm.querySelector('#mainTextChar');
    const submitBtn = postForm.querySelector('button');

    clickedOverlay(postForm, overlayElement);

    charLimit(
      titleInput,
      mainTextInput,
      titleError,
      mainTextError,
      titleChar,
      mainTextChar,
      submitBtn
    );

    enterKeyDown(postForm, submitBtn);

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn.disabled) return;

      const title = titleInput.value.trim();
      const body = mainTextInput.value.trim();
      const userId = getUserId();

      if (!title || !body) return alert('未入力の項目があります');

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          const postElement = createPostElement(data);

          const newEditBtn = postElement.querySelector('.editButton');
          const newDeleteBtn = postElement.querySelector('.deleteButton');

          newEditBtn.style.display = 'block';
          newDeleteBtn.style.display = 'block';

          posts.prepend(postElement);
          overlayElement.remove();

          incrementUserId();
        })
        .catch((err) => console.error(err.message));
    });
  });
}
