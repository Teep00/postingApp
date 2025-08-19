import { createOverlayWithContent, clickedOverlay } from './overlay.js';
import { charLimit } from './charLimit.js';
import { enterClick } from './keyEvent.js';
import { errorMessage } from './errorMessage.js';

export function createElementWithClasses(tag, ...classes) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
}

export function createPostForm({
  sectionTitleText = '新規投稿',
  // placeholderTitle = 'タイトル',
  // placeholderMainText = '本文',
  submitText = '送信',
} = {}) {
  const postForm = createElementWithClasses('form', 'postForm');

  const sectionTitle = createElementWithClasses('h2', 'sectionTitle');
  sectionTitle.textContent = sectionTitleText;

  const newTitleArea = createElementWithClasses('div', 'newTitleArea');

  const newTitleInputTitle = createElementWithClasses(
    'h3',
    'newTitleInputTitle'
  );
  newTitleInputTitle.textContent = 'タイトル';

  const newTitle = createElementWithClasses('input', 'newTitle');
  newTitle.type = 'text';
  // newTitle.placeholder = placeholderTitle;

  const titleErrorContainer = createElementWithClasses(
    'div',
    'titleErrorContainer'
  );

  const titleCharError = createElementWithClasses(
    'p',
    'titleCharError',
    'errorMessage',
    'isHidden'
  );
  const titleRequiredError = createElementWithClasses(
    'p',
    'titleRequired',
    'errorMessage',
    'isHidden'
  );
  titleRequiredError.textContent = errorMessage.titleRequired;
  const titleChar = createElementWithClasses('p', 'titleChar');

  titleErrorContainer.append(titleCharError, titleRequiredError, titleChar);

  const newMainTextArea = createElementWithClasses('div', 'newMainTextArea');

  const newMainTextInputTitle = createElementWithClasses(
    'h3',
    'newMainTextInputTitle'
  );
  newMainTextInputTitle.textContent = '本文';

  const newMainText = createElementWithClasses('textarea', 'newMainText');
  // newMainText.placeholder = placeholderMainText;

  const mainTextErrorContainer = createElementWithClasses(
    'div',
    'mainTextErrorContainer'
  );

  const mainTextCharError = createElementWithClasses(
    'p',
    'mainTextCharError',
    'errorMessage',
    'isHidden'
  );
  const mainTextRequiredError = createElementWithClasses(
    'p',
    'mainTextRequired',
    'errorMessage',
    'isHidden'
  );
  mainTextRequiredError.textContent = errorMessage.mainTextRequired;
  const mainTextChar = createElementWithClasses('p', 'mainTextChar');

  mainTextErrorContainer.append(
    mainTextCharError,
    mainTextRequiredError,
    mainTextChar
  );

  const postFormInBtn = createElementWithClasses('button', 'postFormInBtn');
  postFormInBtn.type = 'submit';
  postFormInBtn.textContent = submitText;

  postForm.append(sectionTitle, newTitleArea, newMainTextArea, postFormInBtn);

  newTitleArea.append(newTitleInputTitle, newTitle, titleErrorContainer);
  newMainTextArea.append(
    newMainTextInputTitle,
    newMainText,
    mainTextErrorContainer
  );

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
    }
  });
  newMainText.addEventListener('input', () => {
    if (newMainText.value.trim()) {
      mainTextRequiredError.classList.add('isHidden');
    }
  });

  enterClick(postForm, postFormInBtn);

  return {
    form: postForm,
    overlayElement,
    elements: {
      newTitle,
      newMainText,
      postFormInBtn,
      titleCharError,
      mainTextCharError,
      titleRequiredError,
      mainTextRequiredError,
    },
  };
}
