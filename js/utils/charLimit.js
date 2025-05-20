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

    titleError.textContent = isTitleTooLong
      ? 'タイトルが30字を超えています'
      : '';
    mainTextError.textContent = isMainTextTooLong
      ? '本文が150字を超えています'
      : '';
    button.disabled = isTitleTooLong || isMainTextTooLong;
  }

  titleInput.addEventListener('input', validate);
  mainTextInput.addEventListener('input', validate);

  validate();
}
