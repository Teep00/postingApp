// インポート
import { myUserName } from './domElementList.js';
import { showCenterToast } from './toast.js';
import { postsButtonVisibility } from './postView.js';

// ------------------------------------------------------- //
/*      ログインユーザー取得・更新関数                          */
// ------------------------------------------------------- //

export function getCurrentUser() {
  // ローカルストレージから現在のユーザー情報を取得
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // ログインしている場合はユーザー名を表示し、UIを更新
  if (currentUser) {
    showCenterToast(`ようこそ！${currentUser.userName}さん！`);
    myUserName.textContent = currentUser.userName;
    postsButtonVisibility(true);
  } else {
    myUserName.textContent = '';
    postsButtonVisibility(false);
  }
}
