export function showError(form, msg) {
  const targetForm = form.querySelector(msg);
  if (targetForm) {
    targetForm.classList.remove('isHidden');
    targetForm.classList.add('isActive');
  }
}
export function resetAllErrors(form, msg) {
  form.querySelectorAll(msg).forEach((el) => {
    el.classList.add('isHidden');
    el.classList.remove('isActive');
  });
}
