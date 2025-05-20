// オーバーレイ作成
export function overlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  // overlay.addEventListener('click', (e) => {
  //   if (e.target === overlay) overlay.remove();
  // });
  document.body.appendChild(overlay);
  return overlay;
}

// オーバーレイにコンテンツを付与
export function createOverlayWithContent(contentElement) {
  if (document.querySelector('.overlay')) return;

  const overlayEl = overlay();
  overlayEl.appendChild(contentElement);
  return overlayEl;
}

// フォーム内でクリック→フォーム外で離してもオーバレイが消えないようにするための処理
export function clickedOverlay(form, overlay) {
  let isOutsideClick = true;

  const onMouseDown = () => {
    isOutsideClick = false;
  };

  const onMouseUp = (e) => {
    if (isOutsideClick && !form.contains(e.target)) {
      overlay.remove();
      /*--ここでaddEventListenerを削除しておかないとイベントが残り続ける--*/
      form.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      /*----------------------------------------------------------*/
    }
    isOutsideClick = true;
  };

  form.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}
