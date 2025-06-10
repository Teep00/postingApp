import {
  operationArea,
  signupBtn,
  loginBtn,
  logoutBtn,
} from './domElementList.js';
import { getAllPosts } from './allPost.js';

export function postsButtonVisibility(isLogIn) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const allPosts = getAllPosts();

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
