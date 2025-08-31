// インポート
import { newPostCreate } from '../modules/createPost.js';
import { handleSearch } from '../modules/search.js';
import { handleSort } from '../modules/sort.js';
import { handleSignup } from '../modules/signup.js';
import { handleLogin } from '../modules/login.js';
import { handleLogout } from '../modules/logout.js';
import { handleGoTop } from '../modules/goTop.js';
import { fetchInitialPosts } from './postManager.js';
import {
  search,
  showAll,
  sort,
  newPostCreateBtn,
  signupBtn,
  loginBtn,
  logoutBtn,
  scrollToTopBtn,
} from '../utils/domElementList.js';
import { getCurrentUser } from '../utils/getCurrentUser.js';
import { likeButtonDisabled } from '../utils/likeButtonDisabled.js';

// 初期投稿取得
window.addEventListener('DOMContentLoaded', () => {
  console.log('リロードが発生しました');

  getCurrentUser();
  fetchInitialPosts();
  likeButtonDisabled();
});

// 新規投稿作成
newPostCreate(newPostCreateBtn);

// フィルター
handleSearch(search, showAll);

// 並び替え
handleSort(sort);

// サインアップ
handleSignup(signupBtn);

// ログイン
handleLogin(loginBtn);

// ログアウト
handleLogout(logoutBtn);

// 最上段へスクロール
handleGoTop(scrollToTopBtn);
