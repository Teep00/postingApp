// Enterキーで送信
export function enterKeyDown(submitForm, submitBtn) {
  submitForm.querySelectorAll('input').forEach((input) =>
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
      }
    })
  );
}
