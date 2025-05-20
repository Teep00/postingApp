// インポート
import { newPostCreate } from './createPost.js';
import { handleFilter } from './filter.js';
import { handleSort } from './sort.js';
import { fetchInitialPosts, incrementUserId, getUserId } from './postUtils.js';
import { filter, showAll, sort, newPostCreateBtn } from './domElementList.js';

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
