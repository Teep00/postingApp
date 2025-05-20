// インポート
import { createOverlayWithContent, clickedOverlay } from './overlay.js';
import { getAllPosts } from '../utils/allPost.js';
import { enterKeyDown } from '../utils/keyEvent.js';

// フィルター

export function handleFilter(filter, showAll) {
  filter.addEventListener('click', () => {
    const filterForm = document.createElement('form');
    filterForm.innerHTML = `
    <h2>絞り込み</h2>
    <input type="number" placeholder="ユーザーIDを入力" class="filterInput" />
    <button type="button" class="filterButton">実行</button>
  `;

    filterForm.classList.add('filterForm');
    const overlayElement = createOverlayWithContent(filterForm);
    const filterButton = filterForm.querySelector('.filterButton');

    filterButton.addEventListener('click', (e) => {
      e.preventDefault();

      enterKeyDown(filterForm, filterButton);

      const inputValue = parseInt(
        filterForm.querySelector('.filterInput').value
      );
      const allPosts = getAllPosts();
      const validUserIds = [
        ...new Set(allPosts.map((post) => parseInt(post.dataset.userid))),
      ];

      if (!validUserIds.includes(inputValue)) {
        alert('入力されたユーザーIDが存在しません');
        return;
      }

      allPosts.forEach((post) => {
        post.style.display =
          parseInt(post.dataset.userid) === inputValue ? 'block' : 'none';
      });

      showAll.style.display = 'block';
      overlayElement.remove();
    });
    clickedOverlay(filterForm, overlayElement);
  });

  showAll.addEventListener('click', () => {
    getAllPosts().forEach((post) => (post.style.display = 'block'));
    showAll.style.display = 'none';
  });
}
