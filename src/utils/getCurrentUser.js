import { myUserName } from './domElementList.js';
import { showCenterToast } from './toast.js';
import { postsButtonVisibility } from './postView.js';

export function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const hasShownToast = sessionStorage.getItem('hasShownWelcomeToast');

  if (currentUser && !hasShownToast) {
    showCenterToast(`おかえりなさい、${currentUser.userName}さん！`);
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

// export function getCurrentUser() {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   const hasShownToast = sessionStorage.getItem('hasShownWelcomeToast');
//   const newPostInProgress = sessionStorage.getItem('newPostInProgress'); // 新規投稿状態の確認

//   // 新規投稿が進行中でない場合にウェルカムメッセージを表示
//   if (currentUser && !hasShownToast && !newPostInProgress) {
//     showCenterToast(`おかえりなさい、${currentUser.userName}さん！`);
//     sessionStorage.setItem('hasShownWelcomeToast', 'true');
//   }

//   if (currentUser) {
//     myUserName.textContent = currentUser.userName;
//     postsButtonVisibility(true);
//   } else {
//     myUserName.textContent = '';
//     postsButtonVisibility(false);
//   }
// }
