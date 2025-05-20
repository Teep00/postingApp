// Enterキーでsubmitイベント発火
export function enterSubmit(submitForm, submitBtn) {
  submitForm.querySelectorAll('input').forEach((input) =>
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.submit();
      }
    })
  );
}

// Enterキーでclickイベント発火
export function enterClick(clickForm, clickBtn) {
  clickForm.querySelectorAll('input').forEach((input) =>
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clickBtn.click();
      }
    })
  );
}
