import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { charLimit } from '../utils/charLimit.js';
import { enterSubmit } from '../utils/keyEvent.js';
import { createPostElement } from '../core/postManager.js';
import {
  createElementWithClasses,
  createInputField,
  createTextareaField,
  createButtonField,
} from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';

// 新規投稿作成
export function newPostCreate(newPostCreateBtn) {
  newPostCreateBtn.addEventListener('click', () => {
    /*---------------------- DOM構築 ----------------------*/

    const postForm = createElementWithClasses('form', 'postForm');

    const postFormSectionTitle = createElementWithClasses(
      'h2',
      'postFormSectionTitle'
    );
    postFormSectionTitle.textContent = '新規投稿';

    const newTitle = createInputField({
      type: 'text',
      placeholder: 'タイトル',
      classes: 'newTitle',
    });

    const titleErrorContainer = createElementWithClasses(
      'div',
      'titleErrorContainer'
    );

    const titleCharError = createElementWithClasses('p', 'titleCharError');

    const titleChar = createElementWithClasses('p', 'titleChar');

    const newMainText = createTextareaField({
      placeholder: '本文',
      classes: 'newMainText',
    });

    const mainTextErrorContainer = createElementWithClasses(
      'div',
      'mainTextErrorContainer'
    );

    const mainTextCharError = createElementWithClasses(
      'p',
      'mainTextCharError'
    );

    const titleRequiredError = createElementWithClasses(
      'p',
      'titleRequired',
      'errorMessage',
      'isHidden'
    );
    titleRequiredError.textContent = errorMessage.titleRequired;

    const mainTextRequiredError = createElementWithClasses(
      'p',
      'mainTextRequired',
      'errorMessage',
      'isHidden'
    );
    mainTextRequiredError.textContent = errorMessage.mainTextRequired;

    const mainTextChar = createElementWithClasses('p', 'mainTextChar');

    const postFormInBtn = createButtonField('submit', 'postFormInBtn');
    postFormInBtn.textContent = '送信';

    /*----------------------------------------------------*/

    postForm.appendChild(postFormSectionTitle);
    postForm.appendChild(newTitle);
    postForm.appendChild(titleErrorContainer);
    titleErrorContainer.appendChild(titleCharError);
    titleErrorContainer.appendChild(titleRequiredError);
    titleErrorContainer.appendChild(titleChar);
    postForm.appendChild(newMainText);
    postForm.appendChild(mainTextErrorContainer);
    mainTextErrorContainer.appendChild(mainTextCharError);
    mainTextErrorContainer.appendChild(mainTextRequiredError);
    mainTextErrorContainer.appendChild(mainTextChar);
    postForm.appendChild(postFormInBtn);

    const overlayElement = createOverlayWithContent(postForm);

    clickedOverlay(postForm, overlayElement);

    charLimit(
      newTitle,
      newMainText,
      titleCharError,
      mainTextCharError,
      titleChar,
      mainTextChar,
      postFormInBtn
    );

    newTitle.addEventListener('input', () => {
      if (newTitle.value.trim()) {
        titleRequiredError.classList.add('isHidden');
        titleRequiredError.classList.remove('isActive');
      }
    });
    newMainText.addEventListener('input', () => {
      if (newMainText.value.trim()) {
        mainTextRequiredError.classList.add('isHidden');
        mainTextRequiredError.classList.remove('isActive');
      }
    });

    enterSubmit(postForm);

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      resetAllErrors(postForm);

      const title = newTitle.value.trim();
      const body = newMainText.value.trim();

      let hasError = false;

      if (!title) {
        showError(postForm, '.titleRequired', errorMessage.titleRequired);
        hasError = true;
      }
      if (!body) {
        showError(postForm, '.mainTextRequired', errorMessage.mainTextRequired);
        hasError = true;
      }

      if (hasError) return;

      if (postFormInBtn.disabled) return;

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })
        .then((res) => res.json())
        .then((data) => {
          const postElement = createPostElement({
            ...data,
            userName: currentUser.userName,
          });

          const buttonContainer = postElement.querySelector('.buttonContainer');

          buttonContainer.classList.remove('isHidden');
          buttonContainer.classList.remove('isActive');

          posts.prepend(postElement);
          overlayElement.remove();
        })
        .catch((err) => console.error(err.message));
    });
  });
}
// postForm.innerHTML = `
//   <h2>新規投稿</h2>
//   <input type="text" placeholder="タイトル" class="newTitle" name="newTitle"/>
//   <div class="errorContainer">
//     <p id="titleError" class="errorMessage"></p>
//     <p id="titleChar" class="char"></p>
//   </div>
//   <textarea placeholder="本文" class="newMainText" name="newBody" ></textarea>
//   <div class="errorContainer">
//     <p id="mainTextError" class="errorMessage"></p>
//     <p id="mainTextChar" class="char"></p>
//   </div>
//   <button type="submit">送信</button>
// `;
