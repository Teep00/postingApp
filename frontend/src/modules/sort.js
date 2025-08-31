// インポート
import { BASE_URL } from '../baseURL.js';
import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { posts } from '../utils/domElementList.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import { createPostElement } from '../core/postManager.js';
import { scrollToTop } from '../utils/scrollToTop.js';

// ------------------------------------------------------- //
/*      投稿並び替え関数                                      */
// ------------------------------------------------------- //

export function handleSort(sortBtn) {
  sortBtn.addEventListener('click', () => {
    // DOM構築
    const { form: sortForm, overlayElement, elements } = createSortForm();

    // 各クリックボタンのイベント
    elements.descLikeValue.addEventListener('click', () =>
      sortLikeValue(overlayElement)
    );
    elements.ascTime.addEventListener('click', () => {
      sortPostingTime('asc', overlayElement);
    });
    elements.descTime.addEventListener('click', () => {
      sortPostingTime('desc', overlayElement);
    });

    // オーバーレイをクリックした時の処理
    clickedOverlay(sortForm, overlayElement);
  });
}

// ------------------------------------------------------- //
/*      共通処理関数                                         */
// ------------------------------------------------------- //

function renderPosts(sorted, overlayElement) {
  posts.innerHTML = '';
  sorted.forEach((post) => {
    createPostElement(post);
  });
  scrollToTop();
  overlayElement.remove();
}

// ------------------------------------------------------- //
/*      いいね数で投稿を降順に並び替える関数                     */
// ------------------------------------------------------- //

function sortLikeValue(overlayElement) {
  fetch(`${BASE_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      const sorted = data.sort((a, b) => {
        return a.likes - b.likes;
      });
      renderPosts(sorted, overlayElement);
    });
}

// ------------------------------------------------------- //
/*      投稿時間で投稿を並び替える関数                          */
// ------------------------------------------------------- //

function sortPostingTime(order, overlayElement) {
  fetch(`${BASE_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      const sorted = data.sort((a, b) => {
        const timeA = Date.parse(a.createdAt);
        const timeB = Date.parse(b.createdAt);

        return order === 'asc' ? timeA - timeB : timeB - timeA;
      });
      renderPosts(sorted, overlayElement);
    });
}

// ------------------------------------------------------- //
/*      DOM構築関数                                         */
// ------------------------------------------------------- //

function createSortForm() {
  // フォーム全体
  const sortForm = createElementWithClasses('form', 'sortForm');

  const sortFormSectionTitle = createElementWithClasses('h2', 'sectionTitle');
  sortFormSectionTitle.textContent = '並べ替え';

  const sortArea = createElementWithClasses('div', 'sortArea');

  // いいね数
  const sortLikeValueArea = createElementWithClasses(
    'div',
    'sortLikeValueArea'
  );

  const descLikeValue = createElementWithClasses('button', 'descLikeValue');
  descLikeValue.type = 'button';
  descLikeValue.textContent = 'いいね数 : 多い順';

  // 投稿時間
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

  // append処理
  sortForm.append(sortFormSectionTitle, sortArea);

  sortArea.append(sortLikeValueArea, sortPostingTimeArea);

  sortLikeValueArea.append(descLikeValue);

  sortPostingTimeArea.append(ascTime, descTime);

  // オーバーレイ作成
  const overlayElement = createOverlayWithContent(sortForm);

  // 各要素をオブジェクトにまとめて返す
  const elements = {
    sortForm,
    overlayElement,
    descLikeValue,
    ascTime,
    descTime,
  };

  return { form: sortForm, overlayElement, elements };
}
