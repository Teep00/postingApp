// ------------------------------------------------------- //
/*      エラー表示作成関数                                    */
// ------------------------------------------------------- //

export function showError(form, selector, msg) {
  const target = form.querySelector(selector);
  if (target) {
    target.textContent = msg;
    target.classList.remove('isHidden');
  }
}

// ------------------------------------------------------- //
/*      エラーリセット関数                                    */
// ------------------------------------------------------- //

export function resetAllErrors(form) {
  form.querySelectorAll('.errorMessage').forEach((el) => {
    el.classList.add('isHidden');
    el.textContent = '';
  });
}

// ------------------------------------------------------- //
/*      エラーメッセージまとめ                                 */
// ------------------------------------------------------- //

export const errorMessage = {
  userNameRequired: 'ユーザーネームが入力されていません',
  userIdRequired: 'ユーザーIDが入力されていません',
  passwordRequired: 'パスワードが入力されていません',
  titleRequired: 'タイトルが入力されていません',
  mainTextRequired: '本文が入力されていません',
  searchWordRequired: '検索ワードを入力してください',

  userIdLengthInvalid: 'ユーザーIDは5文字以上15文字以下で登録してください',
  passwordLengthInvalid: 'パスワードは5文字以上15文字以下で登録してください',

  titleTooLong: 'タイトルが30字を超えています',
  mainTextTooLong: '本文が150字を超えています',

  signupLowerLimit: '5文字以上で登録してください',
  signupUpperLimit: '15文字以下で登録してください',

  invalidUserId: 'ユーザーIDは半角英数字のみ使用できます',
  invalidPassword: 'パスワードは半角英数字のみ使用できます',

  duplicateUserName: 'このユーザーネームは既に使われています',
  duplicateUserId: 'このユーザーIDは既に使われています',

  invalidCredentials: 'ユーザーIDまたはパスワードが間違っています',
  loginRequestError: 'ログインに失敗しました',

  searchNotFoundUser: '一致するユーザーが見つかりませんでした',
};

// ------------------------------------------------------- //
/*      文字数の上限を設定する関数                             */
// ------------------------------------------------------- //

export function upperLimit({
  inputText,
  textChar,
  maxLength,
  errorContainer,
  charError,
  errorMsg,
  requiredError,
  postFormInBtn,
}) {
  function validate() {
    // 現在の文字数を取得
    const currentLength = inputText.value.length;

    // 文字数表示の更新
    textChar.textContent = `${currentLength} / ${maxLength}`;

    // 文字数オーバーの判定
    const isTooLong = currentLength > maxLength;

    // エラーメッセージの表示・非表示
    if (isTooLong) {
      showError(errorContainer, `.${charError.classList[0]}`, errorMsg);
    } else {
      charError.classList.add('isHidden');
    }

    // 入力があったら必須エラーを非表示
    if (inputText.value) {
      requiredError.classList.add('isHidden');
    }

    // ボタンの有効・無効を更新
    postFormInBtn.disabled =
      errorContainer.querySelectorAll('.errorMessage:not(.isHidden)').length >
      0;
  }

  // 初回実行
  validate();

  // 入力ごとにチェック
  inputText.addEventListener('input', validate);
}
