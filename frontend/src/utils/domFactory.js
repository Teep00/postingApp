// インポート
import { createOverlayWithContent, clickedOverlay } from './overlay.js';
import { showError, errorMessage } from './errorMessage.js';

// ------------------------------------------------------- //
/*      要素作成関数                                         */
// ------------------------------------------------------- //

export function createElementWithClasses(tag, ...classes) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
}

// ------------------------------------------------------- //
/*      新規投稿・投稿編集フォーム作成関数                       */
// ------------------------------------------------------- //

export function createPostForm({
  sectionTitleText = '新規投稿',
  submitText = '送信',
} = {}) {
  // DOM構築
  const { postForm, overlayElement, elements } = buildPostForm({
    sectionTitleText,
    submitText,
  });

  // オーバーレイクリックで閉じる処理
  clickedOverlay(postForm, overlayElement);

  // 文字数制限の設定
  charLimit(elements);

  return {
    form: postForm,
    overlayElement,
    elements,
  };
}

// ------------------------------------------------------- //
/*      DOM構築関数                                         */
// ------------------------------------------------------- //

function buildPostForm({ sectionTitleText, submitText }) {
  // フォーム全体
  const postForm = createElementWithClasses('div', 'postForm');

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

  // エラー表示
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

  // append処理
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

  // オーバーレイ作成
  const overlayElement = createOverlayWithContent(postForm);

  const elements = {
    newTitle,
    newMainText,
    titleErrorContainer,
    mainTextErrorContainer,
    titleRequiredError,
    mainTextRequiredError,
    titleCharError,
    mainTextCharError,
    titleChar,
    mainTextChar,
    postFormInBtn,
  };

  return { postForm, overlayElement, elements };
}

// ------------------------------------------------------- //
/*      文字数制限関数                                       */
// ------------------------------------------------------- //

function charLimit(elements) {
  // 引数で受け取った要素を分割代入で取得
  const {
    newTitle,
    newMainText,
    titleErrorContainer,
    mainTextErrorContainer,
    titleRequiredError,
    mainTextRequiredError,
    titleCharError,
    mainTextCharError,
    titleChar,
    mainTextChar,
    postFormInBtn,
  } = elements;

  // 文字数制限の設定
  const maxTitleLength = 30;
  const maxMainTextLength = 150;

  // ------------------------------------------------------- //
  /*      バリデーション関数                                    */
  // ------------------------------------------------------- //

  function validate() {
    // 現在の文字数を取得
    const titleLength = newTitle.value.length;
    const mainTextLength = newMainText.value.length;

    // 文字数表示の更新
    titleChar.textContent = `${titleLength} / ${maxTitleLength}`;
    mainTextChar.textContent = `${mainTextLength} / ${maxMainTextLength}`;

    // 文字数オーバーの判定
    const isTitleTooLong = titleLength > maxTitleLength;
    const isMainTextTooLong = mainTextLength > maxMainTextLength;

    // エラーメッセージの表示・非表示
    if (isTitleTooLong) {
      showError(
        titleErrorContainer,
        '.titleCharError',
        errorMessage.titleTooLong
      );
    } else {
      titleCharError.classList.add('isHidden');
    }
    if (isMainTextTooLong) {
      showError(
        mainTextErrorContainer,
        '.mainTextCharError',
        errorMessage.mainTextTooLong
      );
    } else {
      mainTextCharError.classList.add('isHidden');
    }

    // 入力があったらエラーメッセージを非表示にする処理
    if (newTitle.value) {
      titleRequiredError.classList.add('isHidden');
    }
    if (newMainText.value) {
      mainTextRequiredError.classList.add('isHidden');
    }

    postFormInBtn.disabled = isTitleTooLong || isMainTextTooLong;
  }

  newTitle.addEventListener('input', validate);
  newMainText.addEventListener('input', validate);

  validate();
}
