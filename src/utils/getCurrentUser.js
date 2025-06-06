import { myUserName } from './domElementList.js';
import { showCenterToast } from './toast.js';
import { postsButtonVisibility } from './postView.js';

export function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    showCenterToast(`おかえりなさい、${currentUser.userName}さん！`);
    myUserName.textContent = currentUser.userName;
    postsButtonVisibility(true);
  } else {
    myUserName.textContent = '';
    postsButtonVisibility(false);
  }
}
