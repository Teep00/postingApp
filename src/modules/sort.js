// インポート
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { getAllPosts } from '../utils/allPost.js';
import { posts } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';

// 並び替え
export function handleSort(sort) {
  sort.addEventListener('click', () => {
    const sortForm = createElementWithClasses('form', 'sortForm');

    const sortFormSectionTitle = createElementWithClasses('h2', 'sectionTitle');
    sortFormSectionTitle.textContent = '並べ替え';

    const sortArea = createElementWithClasses('div', 'sortArea');

    const sortLikeValueArea = createElementWithClasses(
      'div',
      'sortLikeValueArea'
    );

    const descLikeValue = createElementWithClasses('button', 'descLikeValue');
    descLikeValue.type = 'button';
    descLikeValue.textContent = 'いいね数 : 多い順';

    const sortPostingTimeArea = createElementWithClasses(
      'div',
      'sortPostingTimeArea'
    );
    const ascTime = createElementWithClasses('button', 'ascTime');
    ascTime.type = 'button';
    ascTime.textContent = '投稿時間 : 新しい順';

    const descTime = createElementWithClasses('button', 'descTime');
    descTime.type = 'button';
    descTime.textContent = '投稿時間 : 古い順';

    sortForm.append(sortFormSectionTitle, sortArea);

    sortArea.append(sortLikeValueArea, sortPostingTimeArea);

    sortLikeValueArea.append(descLikeValue);

    sortPostingTimeArea.append(ascTime, descTime);

    const overlayElement = createOverlayWithContent(sortForm);

    descLikeValue.addEventListener('click', () =>
      sortLikeValue('desc', overlayElement)
    );
    ascTime.addEventListener('click', () => {
      sortPostingTime('asc', overlayElement);
    });
    descTime.addEventListener('click', () => {
      sortPostingTime('desc', overlayElement);
    });

    clickedOverlay(sortForm, overlayElement);
  });
}

function sortLikeValue(order, overlayElement) {
  const sorted = [...getAllPosts()].sort((a, b) => {
    const ALikes = parseInt(a.dataset.likes ?? '0', 10);
    const BLikes = parseInt(b.dataset.likes ?? '0', 10);
    return order === 'asc' ? ALikes - BLikes : BLikes - ALikes;
  });

  sorted.forEach((el) => posts.appendChild(el));
  overlayElement.remove();
}

function sortPostingTime(order, overlayElement) {
  const sorted = [...getAllPosts()].sort((a, b) => {
    const Atime = parseInt(a.dataset.timeStamp ?? '0', 10);
    const Btime = parseInt(b.dataset.timeStamp ?? '0', 10);
    return order === 'asc' ? Btime - Atime : Atime - Btime;
  });

  sorted.forEach((el) => posts.appendChild(el));
  overlayElement.remove();
}
