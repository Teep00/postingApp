// インポート
import { errorMessage } from './errorMessage.js';

// 文字数制限
export function charLimit(
  titleInput,
  mainTextInput,
  titleError,
  mainTextError,
  titleChar,
  mainTextChar,
  button
) {
  const maxTitleLength = 30;
  const maxMainTextLength = 150;

  function validate() {
    const titleLength = titleInput.value.length;
    const mainTextLength = mainTextInput.value.length;

    titleChar.textContent = `${titleLength} / ${maxTitleLength}`;

    mainTextChar.textContent = `${mainTextLength} / ${maxMainTextLength}`;

    const isTitleTooLong = titleLength > maxTitleLength;
    const isMainTextTooLong = mainTextLength > maxMainTextLength;

    if (isTitleTooLong) {
      titleError.textContent = errorMessage.titleTooLong;
      titleError.classList.remove('isHidden');
    } else {
      titleError.classList.add('isHidden');
    }
    if (isMainTextTooLong) {
      mainTextError.textContent = errorMessage.mainTextTooLong;
      mainTextError.classList.remove('isHidden');
    } else {
      mainTextError.classList.add('isHidden');
    }

    button.disabled = isTitleTooLong || isMainTextTooLong;
  }

  titleInput.addEventListener('input', validate);
  mainTextInput.addEventListener('input', validate);

  validate();
}
