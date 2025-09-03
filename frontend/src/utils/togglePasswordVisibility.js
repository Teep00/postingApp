// ------------------------------------------------------- //
/*      パスワード表示・非表示の切り替えをする関数                */
// ------------------------------------------------------- //

export function togglePasswordVisibility(input, btn) {
  const isPassword = input.type === 'password';
  if (isPassword) {
    input.type = 'text';
    btn.classList.remove('fa-eye');
    btn.classList.add('fa-eye-slash');
  } else if (!isPassword) {
    input.type = 'password';
    btn.classList.add('fa-eye');
    btn.classList.remove('fa-eye-slash');
  }
}
