import {
  myUserName,
  operationArea,
  signupBtn,
  loginBtn,
} from '../utils/domElementList.js';
import { showCenterToast } from '../utils/toast.js';

export function handleLogout(logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    myUserName.textContent = '';
    showCenterToast('ログアウトしました');

    operationArea.classList.add('isHidden');
    operationArea.classList.remove('isActive');

    signupBtn.classList.remove('isHidden');
    signupBtn.classList.add('isActive');

    loginBtn.classList.remove('isHidden');
    loginBtn.classList.add('isActive');

    logoutBtn.classList.add('isHidden');
    logoutBtn.classList.remove('isActive');
  });
}
