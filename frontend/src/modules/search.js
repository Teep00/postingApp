// インポート
import { BASE_URL } from '../baseURL.js';
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { posts } from '../utils/domElementList.js';
import { enterClick } from '../utils/keyEvent.js';
import { postsButtonVisibility } from '../utils/postView.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';
import { createPostElement } from '../core/postManager.js';
import { scrollToTop } from '../utils/scrollToTop.js';

// ログイン中のユーザー情報を取得
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// ------------------------------------------------------- //
/*      投稿検索関数                                         */
// ------------------------------------------------------- //

export function handleSearch(search, showAll) {
  search.addEventListener('click', () => {
    // DOM構築
    const { form: searchForm, overlayElement, elements } = createSerchForm();

    // Enterキーで送信
    enterClick(searchForm, elements.searchButton);

    elements.searchButton.addEventListener('click', (e) => {
      // デフォルトのフォーム送信を防止
      e.preventDefault();

      // 以前のエラーメッセージをリセット
      resetAllErrors(searchForm);

      // 入力値を取得
      const inputValue = searchForm.querySelector('.searchInput').value.trim();

      // 検索ワードが空の場合のエラー
      if (!inputValue) {
        showError(
          searchForm,
          '.searchWordRequired',
          errorMessage.searchWordRequired
        );
        elements.searchInputDiscription.classList.add('isHidden');
        return;
      }

      // 入力内容とデータベースのユーザーネームを照合
      fetch(`${BASE_URL}/posts/${inputValue}/search`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            showError(
              searchForm,
              '.searchNotFoundUser',
              errorMessage.searchNotFoundUser
            );
            elements.searchInputDiscription.classList.add('isHidden');
            loadAllPosts();
            return;
          }
          posts.innerHTML = '';

          data.forEach((post) => {
            createPostElement(post);
          });

          postsButtonVisibility(!!currentUser);

          showAll.classList.remove('isHidden');

          scrollToTop();
          overlayElement.remove();
        })
        .catch((err) => console.error(err.message));
    });
    // オーバーレイをクリックした時の処理
    clickedOverlay(searchForm, overlayElement);
  });

  // 表示投稿をリセット
  showAll.addEventListener('click', () => {
    loadAllPosts().then(() => {
      scrollToTop();
      showAll.classList.add('isHidden');
    });
  });
}

function loadAllPosts() {
  return fetch(`${BASE_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      posts.innerHTML = '';
      data.forEach((post) => createPostElement(post));
      postsButtonVisibility(!!currentUser);
    })
    .catch((err) => console.error(err.message));
}

// ------------------------------------------------------- //
/*      DOM構築関数                                         */
// ------------------------------------------------------- //

function createSerchForm() {
  // フォーム全体
  const searchForm = createElementWithClasses('form', 'searchForm');

  const searchPostSctionTitle = createElementWithClasses(
    'h2',
    'searchPostSctionTitle'
  );
  searchPostSctionTitle.textContent = '検索';

  const searchInput = createElementWithClasses('input', 'searchInput');
  searchInput.type = 'text';

  const searchInputDiscription = createElementWithClasses(
    'p',
    'searchInputDiscription'
  );
  searchInputDiscription.textContent = 'ユーザーネームを入力してください';

  // エラー表示
  const errorContainer = createElementWithClasses('div', 'errorContainer');

  const searchWordRequired = createElementWithClasses(
    'p',
    'searchWordRequired',
    'errorMessage',
    'isHidden'
  );
  searchWordRequired.textContent = '検索ワードを入力してください';

  const searchNotFoundUser = createElementWithClasses(
    'p',
    'searchNotFoundUser',
    'errorMessage',
    'isHidden'
  );
  searchNotFoundUser.textContent = '一致するユーザーが見つかりませんでした';

  const searchButton = createElementWithClasses('button', 'searchButton');
  searchButton.type = 'button';
  searchButton.textContent = '実行';

  // append処理
  searchForm.append(
    searchPostSctionTitle,
    searchInput,
    searchInputDiscription,
    errorContainer,
    searchButton
  );
  errorContainer.append(searchWordRequired, searchNotFoundUser);

  // オーバーレイ作成
  const overlayElement = createOverlayWithContent(searchForm);

  // 各要素をオブジェクトにまとめて返す
  const elements = {
    searchInputDiscription,
    searchButton,
  };

  return { form: searchForm, overlayElement, elements };
}
