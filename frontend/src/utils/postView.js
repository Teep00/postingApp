// インポート
import {
  operationArea,
  signupBtn,
  loginBtn,
  logoutBtn,
} from './domElementList.js';
import { getAllPosts } from './allPost.js';

// ------------------------------------------------------- //
/*      各ボタンの表示/非表示の切り替え関数                      */
// ------------------------------------------------------- //

export function postsButtonVisibility(isLogIn) {
  // ログイン中のユーザー情報を取得
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // すべての投稿要素を取得
  const allPosts = getAllPosts();

  // 編集・削除ボタンの表示/非表示を切り替え
  allPosts.forEach((post) => {
    const editBtn = post.querySelector('.editButton');
    const deleteBtn = post.querySelector('.deleteButton');
    const postOwner = post.dataset.name;

    if (isLogIn && currentUser.userName === postOwner) {
      editBtn.classList.remove('isHidden');
      deleteBtn.classList.remove('isHidden');
    } else {
      editBtn.classList.add('isHidden');
      deleteBtn.classList.add('isHidden');
    }
  });

  // サイドボタンとアカウント認証関係のボタンの表示/非表示を切り替え
  if (isLogIn) {
    operationArea.classList.remove('isHidden');
    signupBtn.classList.add('isHidden');
    loginBtn.classList.add('isHidden');
    logoutBtn.classList.remove('isHidden');
  } else {
    operationArea.classList.add('isHidden');
    signupBtn.classList.remove('isHidden');
    loginBtn.classList.remove('isHidden');
    logoutBtn.classList.add('isHidden');
  }
}
