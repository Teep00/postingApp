import { myUserName } from './domElementList.js';
import { showCenterToast } from './toast.js';
import { postsButtonVisibility } from './postView.js';

export function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const hasShownToast = sessionStorage.getItem('hasShownWelcomeToast');
  const suppressToast = sessionStorage.getItem('suppressWelcomeToast');

  if (suppressToast) {
    sessionStorage.removeItem('suppressWelcomeToast');
    return;
  }

  if (currentUser && !hasShownToast) {
    showCenterToast(`ようこそ！${currentUser.userName}さん！`);
    sessionStorage.setItem('hasShownWelcomeToast', 'true');
  }

  if (currentUser) {
    myUserName.textContent = currentUser.userName;
    postsButtonVisibility(true);
  } else {
    myUserName.textContent = '';
    postsButtonVisibility(false);
  }
}
