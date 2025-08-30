// ------------------------------------------------------- //
/*      エンターキークリックイベント関数                        */
// ------------------------------------------------------- //

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
