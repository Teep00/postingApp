// インポート
import { errorMessage } from '../utils/errorMessage.js';

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

    titleChar.textContent =
      titleLength > 0 ? `${titleLength} / ${maxTitleLength}` : '';
    mainTextChar.textContent =
      mainTextLength > 0 ? `${mainTextLength} / ${maxMainTextLength}` : '';

    const isTitleTooLong = titleLength > maxTitleLength;
    const isMainTextTooLong = mainTextLength > maxMainTextLength;

    titleError.textContent = isTitleTooLong ? errorMessage.titleTooLong : '';
    mainTextError.textContent = isMainTextTooLong
      ? errorMessage.mainTextTooLong
      : '';
    button.disabled = isTitleTooLong || isMainTextTooLong;
  }

  titleInput.addEventListener('input', validate);
  mainTextInput.addEventListener('input', validate);

  validate();
}
