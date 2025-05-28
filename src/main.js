// インポート
import { newPostCreate } from './modules/createPost.js';
import { handleFilter } from './modules/filter.js';
import { handleSort } from './modules/sort.js';
import { handleSignup } from './modules/signUp.js';
import { handleLogin } from './modules/login.js';
import { handleLogout } from './modules/logout.js';
import { fetchInitialPosts } from './core/postManager.js';
import {
  filter,
  showAll,
  sort,
  newPostCreateBtn,
  signupBtn,
  loginBtn,
  logoutBtn,
} from './utils/domElementList.js';
import { getCurrentUser } from './utils/getCurrentUser.js';

// 初期投稿取得
window.addEventListener('DOMContentLoaded', () => {
  fetchInitialPosts();
  getCurrentUser();
});

// 新規投稿作成
newPostCreate(newPostCreateBtn);

// フィルター
handleFilter(filter, showAll);

// 並び替え
handleSort(sort);

// 新規登録
handleSignup(signupBtn);

// ログイン
handleLogin(loginBtn);

// ログアウト
handleLogout(logoutBtn);
