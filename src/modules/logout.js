import { myUserName } from '../utils/domElementList.js';
import { showCenterToast } from '../utils/toast.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { likeButtonDisabled } from '../utils/likeButtonDisabled.js';

export function handleLogout(logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    likeButtonDisabled();
    myUserName.textContent = '';
    showCenterToast('ログアウトしました');
    postsButtonVisibility(false);
  });
}
