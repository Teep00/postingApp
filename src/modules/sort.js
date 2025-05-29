// インポート
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { getAllPosts } from '../utils/allPost.js';

// 並び替え
export function handleSort(sort) {
  sort.addEventListener('click', () => {
    const sortForm = document.createElement('form');
    sortForm.classList.add('sortForm');
    sortForm.innerHTML = `
    <h2>並べ替え</h2>
    <div class="sortArea"> 
      <div class="sortLikeValueArea">
      <button type="button" class="descLikeValue">いいね数 : 多い順</button>
      </div>
      <div class="sortPostingTimeArea">
      <button type="button" class="ascTime ">投稿時間 : 新しい順</button>
      <button type="button" class="descTime ">投稿時間 : 古い順</button>
      </div>
    </div>
  `;

    const overlayElement = createOverlayWithContent(sortForm);

    sortForm
      .querySelector('.descLikeValue')
      .addEventListener('click', () => sortLikeValue('desc', overlayElement));
    sortForm.querySelector('.ascTime').addEventListener('click', () => {
      sortPostingTime('asc', overlayElement);
    });
    sortForm.querySelector('.descTime').addEventListener('click', () => {
      sortPostingTime('desc', overlayElement);
    });

    clickedOverlay(sortForm, overlayElement);
  });
}

function sortLikeValue(order, overlayElement) {
  const sorted = getAllPosts().sort((a, b) => {
    const idA = parseInt(a.dataset.likes);
    const idB = parseInt(b.dataset.likes);
    return order === 'asc' ? idA - idB : idB - idA;
  });
  sorted.forEach((el) => posts.appendChild(el));
  overlayElement.remove();
}

function sortPostingTime(order, overlayElement) {
  const sorted = getAllPosts().sort((a, b) => {
    const idA = parseInt(a.dataset.timeStamp);
    const idB = parseInt(b.dataset.timeStamp);
    return order === 'asc' ? idB - idA : idA - idB;
  });
  sorted.forEach((el) => posts.appendChild(el));
  overlayElement.remove();
}
