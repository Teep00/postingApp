// ------------------------------------------------------- //
/*      オーバーレイ作成関数                                  */
// ------------------------------------------------------- //

export function overlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.append(overlay);
  return overlay;
}

// ------------------------------------------------------- //
/*      オーバーレイにコンテンツを付与する関数                   */
// ------------------------------------------------------- //

export function createOverlayWithContent(contentElement) {
  // すでにオーバーレイが存在する場合は新たに作成しない
  if (document.querySelector('.overlay')) return;

  const overlayEl = overlay();
  overlayEl.append(contentElement);
  return overlayEl;
}

// ---------------------------------------------------------------------------- //
/*      フォーム内でクリック→フォーム外で離してもオーバレイが消えないようにするための関数                   */
// ---------------------------------------------------------------------------- //

export function clickedOverlay(form, overlay) {
  // フォーム外クリックを検知するためのフラグ
  let isOutsideClick = true;

  // マウスダウンイベントでフラグをリセット
  const onMouseDown = () => {
    isOutsideClick = false;
  };

  // マウスアップイベントでフォーム外クリックを検知
  const onMouseUp = (e) => {
    // フォーム外クリックかつクリック先がフォーム内でない場合
    if (isOutsideClick && !form.contains(e.target)) {
      // フォーム外クリック時の処理
      if (document.body.contains(overlay)) overlay.remove();

      // ここでaddEventListenerを削除しておかないとイベントが残り続ける
      form.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    }
    isOutsideClick = true;
  };

  form.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
}
