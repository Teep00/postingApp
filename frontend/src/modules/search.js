// インポート
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { getAllPosts } from '../utils/allPost.js';
import { enterClick } from '../utils/keyEvent.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';

// フィルター
export function handleSearch(search, showAll) {
  search.addEventListener('click', () => {
    const searchForm = createElementWithClasses('form', 'searchForm');

    const searchPostSctionTitle = createElementWithClasses(
      'h2',
      'searchPostSctionTitle'
    );
    searchPostSctionTitle.textContent = 'ユーザーネームで検索';

    const searchInput = createElementWithClasses('input', 'searchInput');
    searchInput.type = 'text';
    searchInput.placeholder = 'ここへ入力';

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

    searchForm.append(
      searchPostSctionTitle,
      searchInput,
      errorContainer,
      searchButton
    );
    errorContainer.append(searchWordRequired, searchNotFoundUser);

    const overlayElement = createOverlayWithContent(searchForm);

    enterClick(searchForm, searchButton);

    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllErrors(searchForm);

      const inputValue = searchForm
        .querySelector('.searchInput')
        .value.trim()
        .toLowerCase();

      if (!inputValue) {
        showError(
          searchForm,
          '.searchWordRequired',
          errorMessage.searchWordRequired
        );
        return;
      }

      const allPosts = getAllPosts();
      let matchFound = false;

      allPosts.forEach((post) => {
        const userNameEl = post.querySelector('.userName');
        const userName = userNameEl?.textContent.trim().toLowerCase();

        if (userName && userName.includes(inputValue)) {
          post.classList.remove('isHidden');
          matchFound = true;
        } else {
          post.classList.add('isHidden');
        }
      });

      if (!matchFound) {
        showError(
          searchForm,
          '.searchNotFoundUser',
          errorMessage.searchNotFoundUser
        );
        showAll.click();
        return;
      }

      showAll.classList.remove('isHidden');
      overlayElement.remove();
    });
    clickedOverlay(searchForm, overlayElement);
  });

  showAll.addEventListener('click', () => {
    getAllPosts().forEach((post) => {
      post.classList.remove('isHidden');
    });
    showAll.classList.add('isHidden');
  });
}
