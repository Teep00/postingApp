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

  invalidUserId: 'ユーザーIDは半角英数字のみ使用できます',
  invalidPassword: 'パスワードは半角英数字のみ使用できます',

  duplicateUserName: 'このユーザーネームは既に使われています',
  duplicateUserId: 'このユーザーIDは既に使われています',

  invalidCredentials: 'ユーザーIDまたはパスワードが間違っています',
  loginRequestError: 'ログインに失敗しました',

  searchNotFoundUser: '一致するユーザーが見つかりませんでした',
};
