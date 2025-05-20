// インポート
import { newPostCreate } from './components/createPost.js';
import { handleFilter } from './components/filter.js';
import { handleSort } from './components/sort.js';
import {
  fetchInitialPosts,
  incrementUserId,
  getUserId,
} from './components/postUtils.js';
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
