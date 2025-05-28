import {
  myUserName,
  operationArea,
  signupBtn,
  loginBtn,
  logoutBtn,
} from './domElementList.js';
import { showCenterToast } from './toast.js';

export function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    showCenterToast(`おかえりなさい、${currentUser.userName}さん！`);

    myUserName.textContent = currentUser.userName;

    operationArea.classList.remove('isHidden');
    operationArea.classList.add('isActive');

    signupBtn.classList.add('isHidden');
    signupBtn.classList.remove('isActive');

    loginBtn.classList.add('isHidden');
    loginBtn.classList.remove('isActive');

    logoutBtn.classList.remove('isHidden');
    logoutBtn.classList.add('isActive');
  } else {
    myUserName.textContent = '';

    operationArea.classList.add('isHidden');
    operationArea.classList.remove('isActive');

    signupBtn.classList.remove('isHidden');
    signupBtn.classList.add('isActive');

    loginBtn.classList.remove('isHidden');
    loginBtn.classList.add('isActive');

    logoutBtn.classList.add('isHidden');
    logoutBtn.classList.remove('isActive');
  }
}
