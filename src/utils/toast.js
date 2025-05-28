export function showCenterToast(message, duration = 2500) {
  const toast = document.createElement('div');
  toast.classList.add('toastCenter');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}
