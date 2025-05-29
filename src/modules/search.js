// インポート
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { getAllPosts } from '../utils/allPost.js';
import { enterClick } from '../utils/keyEvent.js';
import { showError, resetAllErrors } from '../utils/errorMessage.js';

// フィルター
export function handleSearch(search, showAll) {
  search.addEventListener('click', () => {
    const searchForm = document.createElement('form');
    searchForm.innerHTML = `
    <h2>ユーザーネームで検索</h2>
    <input type="text" placeholder="ここへ入力" class="searchInput" /> 
    <div class="errorContainer">
      <p class="errorMessage isHidden seachWordRequired">検索ワードを入力してください</p>
      <p class="errorMessage isHidden searchNotFoundUser">一致するユーザーが見つかりませんでした</p>
    </div>
    <button type="button" class="searchButton">実行</button>
  `;

    searchForm.classList.add('searchForm');
    const overlayElement = createOverlayWithContent(searchForm);
    const searchButton = searchForm.querySelector('.searchButton');

    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllErrors(searchForm, '.errorMessage');
      enterClick(searchForm, searchButton);

      const inputValue = searchForm
        .querySelector('.searchInput')
        .value.trim()
        .toLowerCase();

      if (!inputValue) {
        showError(searchForm, '.seachWordRequired');
        return;
      }

      const allPosts = getAllPosts();
      let matchFound = false;

      allPosts.forEach((post) => {
        const userNameEl = post.querySelector('.userName');
        const userName = userNameEl?.textContent.trim().toLowerCase();

        if (userName && userName.includes(inputValue)) {
          post.classList.remove('isHidden');
          post.classList.add('isActive');
          matchFound = true;
        } else {
          post.classList.add('isHidden');
          post.classList.remove('isActive');
        }
      });

      if (!matchFound) {
        showError(searchForm, '.searchNotFoundUser');
        showAll.click();
        return;
      }

      showAll.classList.remove('isHidden');
      showAll.classList.add('isActive');
      overlayElement.remove();
    });
    clickedOverlay(searchForm, overlayElement);
  });

  showAll.addEventListener('click', () => {
    getAllPosts().forEach((post) => {
      post.classList.remove('isHidden');
      post.classList.add('isActive');
    });
    showAll.classList.add('isHidden');
    showAll.classList.remove('isActive');
  });
}
