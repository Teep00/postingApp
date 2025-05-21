// インポート
import { newPostCreate } from './modules/createPost.js';
import { handleFilter } from './modules/filter.js';
import { handleSort } from './modules/sort.js';
import {
  fetchInitialPosts,
  incrementUserId,
  getUserId,
} from './core/postManager.js';
import {
  filter,
  showAll,
  sort,
  newPostCreateBtn,
} from './utils/domElementList.js';

// 初期投稿取得
window.addEventListener('DOMContentLoaded', () => {
  fetchInitialPosts();
});

// 新規投稿作成
newPostCreate(newPostCreateBtn, incrementUserId, getUserId);

// フィルター
handleFilter(filter, showAll);

// 並び替え
handleSort(sort);
