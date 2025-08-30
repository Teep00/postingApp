// インポート
import { scrollToTop } from '../utils/scrollToTop.js';

// ------------------------------------------------------- //
/*      scrollToTopBtnクリック関数                           */
// ------------------------------------------------------- //

export function handleGoTop(btn) {
  btn.addEventListener('click', () => {
    scrollToTop();
  });
}
