export function showError(form, selector, msg) {
  const target = form.querySelector(selector);
  if (target) {
    target.textContent = msg;
    target.classList.remove('isHidden');
    target.classList.add('isActive');
  }
}
export function resetAllErrors(form) {
  form.querySelectorAll('.errorMessage').forEach((el) => {
    el.classList.add('isHidden');
    el.classList.remove('isActive');
    el.textContent = '';
  });
}

export const errorMessage = {
  userIdRequired: 'ユーザーIDが入力されていません',
  passwordRequired: 'パスワードが入力されていません',
  titleRequired: 'タイトルが入力されていません',
  mainTextRequired: '本文が入力されていません',
  searchWordRequired: '検索ワードを入力してください',

  userIdTooShort: 'ユーザーIDは5文字以上で登録してください',
  userNameTooShort: 'ユーザーネームは5文字以上で登録してください',
  passwordTooShort: 'パスワードは5文字以上で登録してください',

  titleTooLong: 'タイトルが30字を超えています',
  mainTextTooLong: '本文が150字を超えています',

  invalidUserId: 'ユーザーIDは半角英数字のみ使用できます',
  invalidPassword: 'パスワードは半角英数字のみ使用できます',

  duplicateUserName: 'このユーザーネームは既に使われています',
  duplicateUserId: 'このユーザーIDは既に使われています',

  loginFaild: 'ユーザーIDまたはパスワードが間違っています',
  searchNotFoundUser: '一致するユーザーが見つかりませんでした',
};
