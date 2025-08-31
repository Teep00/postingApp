// ------------------------------------------------------- //
/*      トースト表示関数                                      */
// ------------------------------------------------------- //

export function showCenterToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toastCenter');
  toast.textContent = message;
  document.body.appendChild(toast);

  // 2.5秒後にトーストを削除
  setTimeout(() => {
    toast.remove();
  }, 2500);
}
