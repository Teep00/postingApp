import { createOverlayWithContent, clickedOverlay } from '../utils/overlay.js';
import { createConfirmDialog } from '../utils/confirmDialog.js';
import { showCenterToast } from '../utils/toast.js';
import { createElementWithClasses } from '../utils/domFactory.js';
import { showError, resetAllErrors } from '../utils/errorMessage.js';

export function handleSignup(signupBtn) {
  signupBtn.addEventListener('click', () => {
    showSignupForm();
  });
}

export function showSignupForm(savedValues = {}) {
  const { form: signupForm, overlayElement, elements } = createSignupForm();

  if (savedValues.userName)
    elements.signupUserNameInput.value = savedValues.userName;
  if (savedValues.userId) elements.signupUserIdInput.value = savedValues.userId;
  if (savedValues.password)
    elements.signupPasswordInput.value = savedValues.password;

  function signupInput(inputElement, checkIcon, crossIcon) {
    inputElement.addEventListener('input', () => {
      if (inputElement !== elements.signupUserNameInput) {
        inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');

        if (inputElement.value.length === 0) {
          crossIcon.classList.add('isHidden');
          checkIcon.classList.add('isHidden');
        } else if (inputElement.value.length < 5) {
          crossIcon.classList.remove('isHidden');

          checkIcon.classList.add('isHidden');
        } else {
          crossIcon.classList.add('isHidden');
          checkIcon.classList.remove('isHidden');
        }
      } else {
        if (inputElement.value.length === 0) {
          crossIcon.classList.add('isHidden');
          checkIcon.classList.add('isHidden');
        } else {
          crossIcon.classList.add('isHidden');
          checkIcon.classList.remove('isHidden');
        }
      }
    });
  }

  signupInput(
    elements.signupUserNameInput,
    elements.userNameCheckIcon,
    elements.userNameCrossIcon
  );
  signupInput(
    elements.signupUserIdInput,
    elements.userIdCheckIcon,
    elements.userIdCrossIcon
  );
  signupInput(
    elements.signupPasswordInput,
    elements.passwordCheckIcon,
    elements.passwordCrossIcon
  );

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    resetAllErrors(signupForm);

    elements.signupUserNameDiscription.classList.add('isHidden');
    elements.signupUserIdDiscription.classList.add('isHidden');
    elements.signupPasswordDiscription.classList.add('isHidden');

    const signupUserNameValue = elements.signupUserNameInput.value;
    const signupUserIdValue = elements.signupUserIdInput.value;
    const signupPasswordValue = elements.signupPasswordInput.value;
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    let hasError = false;

    if (signupUserNameValue.length === 0) {
      showError(
        signupForm,
        '.userNameRequired',
        'ユーザーネームが入力されていません'
      );
      elements.signupUserNameDiscription.classList.add('isHidden');
      hasError = true;
    }

    if (signupUserIdValue.length === 0) {
      showError(
        signupForm,
        '.userIdRequired',
        'ユーザーIDが入力されていません'
      );
      elements.signupUserIdDiscription.classList.add('isHidden');
      hasError = true;
    } else if (signupUserIdValue.length < 5) {
      showError(
        signupForm,
        '.userIdTooShort',
        'ユーザーIDは5文字以上で登録してください'
      );
      elements.signupUserIdDiscription.classList.add('isHidden');
      hasError = true;
    }

    if (signupPasswordValue.length === 0) {
      showError(
        signupForm,
        '.passwordRequired',
        'パスワードが入力されていません'
      );
      elements.signupPasswordDiscription.classList.add('isHidden');
      hasError = true;
    } else if (signupPasswordValue.length < 5) {
      showError(
        signupForm,
        '.passwordTooShort',
        'パスワードは5文字以上で登録してください'
      );
      elements.signupPasswordDiscription.classList.add('isHidden');
      hasError = true;
    }

    // 文字数が足りている場合のみ、形式エラーを表示
    if (
      !alphanumeric.test(signupUserIdValue) &&
      signupUserIdValue.length >= 5
    ) {
      showError(
        signupForm,
        '.invalidUserId',
        'ユーザーIDは半角英数字のみ使用できます'
      );
      hasError = true;
    }
    if (
      !alphanumeric.test(signupPasswordValue) &&
      signupPasswordValue.length >= 5
    ) {
      showError(
        signupForm,
        '.invalidPassword',
        'パスワードは半角英数字のみ使用できます'
      );
      hasError = true;
    }

    if (hasError) return;

    const [userNameRes, userIdRes] = await Promise.all([
      fetch(
        `http://localhost:3000/users?userName=${encodeURIComponent(
          signupUserNameValue
        )}`
      ),
      fetch(
        `http://localhost:3000/users?userId=${encodeURIComponent(
          signupUserIdValue
        )}`
      ),
    ]);
    const [userNameData, userIdData] = await Promise.all([
      userNameRes.json(),
      userIdRes.json(),
    ]);
    if (userNameData.length > 0) {
      showError(
        signupForm,
        '.duplicateUserName',
        'このユーザーネームは既に使われています'
      );
      hasError = true;
    }
    if (userIdData.length > 0) {
      showError(
        signupForm,
        '.duplicateUserId',
        'このユーザーIDは既に使われています'
      );
      hasError = true;
    }

    if (hasError) return;
    overlayElement.remove();

    createConfirmDialog({
      mainMessage: '登録内容を確定しますか？',
      affirmMessage: '登録',
      clickYesBtn: async () => {
        const newUser = {
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
          likes: [],
        };

        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        showCenterToast('登録が完了しました！');
      },
      clickNoBtn: () => {
        showSignupForm({
          userName: signupUserNameValue,
          userId: signupUserIdValue,
          password: signupPasswordValue,
        });
      },
    });
  });

  clickedOverlay(signupForm, overlayElement);
}

function createSignupForm() {
  const signupForm = createElementWithClasses('form', 'signupForm');

  const signupFormSectionTitle = createElementWithClasses(
    'h2',
    'signupFormSectionTitle'
  );
  signupFormSectionTitle.textContent = '新規登録';

  const signupUserNameArea = createElementWithClasses(
    'div',
    'signupUserNameArea'
  );

  const signupUserNameAreaTitle = createElementWithClasses(
    'h3',
    'signupUserNameAreaTitle'
  );
  signupUserNameAreaTitle.textContent = 'ユーザーネーム';

  const signupUserNameOuter = createElementWithClasses(
    'div',
    'signupUserNameOuter'
  );

  const signupUserNameInput = createElementWithClasses(
    'input',
    'signupUserNameInput'
  );
  signupUserNameInput.type = 'text';
  signupUserNameInput.maxlength = '20';

  const signupUserNameInner = createElementWithClasses(
    'div',
    'signupUserNameInner'
  );

  const userNameCheckIcon = createElementWithClasses(
    'i',
    'userNameCheckIcon',
    'isHidden',
    'fa-solid',
    'fa-check'
  );

  const userNameCrossIcon = createElementWithClasses(
    'i',
    'userNameCrossIcon',
    'isHidden',
    'fa-solid',
    'fa-xmark'
  );

  const userNameErrorContainer = createElementWithClasses(
    'div',
    'userNameErrorContainer'
  );

  const signupUserNameDiscription = createElementWithClasses(
    'p',
    'signupUserNameDiscription'
  );
  signupUserNameDiscription.textContent =
    '半角英数字5文字以上15文字以下で登録してください';

  const userNameRequired = createElementWithClasses(
    'p',
    'userNameRequired',
    'errorMessage',
    'isHidden'
  );
  userNameRequired.textContent = 'ユーザーネームが入力されていません';

  const duplicateUserName = createElementWithClasses(
    'p',
    'duplicateUserName',
    'errorMessage',
    'isHidden'
  );
  duplicateUserName.textContent = 'このユーザーネームは既に使われています';

  /*---------------------------------------------------------------*/

  const signupUserIdArea = createElementWithClasses('div', 'signupUserIdArea');

  const signupUserIdAreaTitle = createElementWithClasses(
    'h3',
    'signupUserIdAreaTitle'
  );
  signupUserIdAreaTitle.textContent = 'ユーザーID';

  const signupUserIdOuter = createElementWithClasses(
    'div',
    'signupUserIdOuter'
  );

  const signupUserIdInput = createElementWithClasses(
    'input',
    'signupUserIdInput'
  );
  signupUserIdInput.type = 'text';
  signupUserIdInput.maxlength = '20';

  const signupUserIdInner = createElementWithClasses(
    'div',
    'signupUserIdInner'
  );

  const userIdCheckIcon = createElementWithClasses(
    'i',
    'userIdCheckIcon',
    'isHidden',
    'fa-solid',
    'fa-check'
  );

  const userIdCrossIcon = createElementWithClasses(
    'i',
    'userIdCrossIcon',
    'isHidden',
    'fa-solid',
    'fa-xmark'
  );

  const userIdErrorContainer = createElementWithClasses(
    'div',
    'userIdErrorContainer'
  );

  const signupUserIdDiscription = createElementWithClasses(
    'p',
    'signupUserIdDiscription'
  );
  signupUserIdDiscription.textContent =
    '半角英数字5文字以上15文字以下で登録してください';

  const userIdRequired = createElementWithClasses(
    'p',
    'userIdRequired',
    'errorMessage',
    'isHidden'
  );
  userIdRequired.textContent = 'ユーザーIDが入力されていません';

  const userIdTooShort = createElementWithClasses(
    'p',
    'userIdTooShort',
    'errorMessage',
    'isHidden'
  );
  userIdTooShort.textContent = 'ユーザーIDは5文字以上で登録してください';

  const duplicateUserId = createElementWithClasses(
    'p',
    'duplicateUserId',
    'errorMessage',
    'isHidden'
  );
  duplicateUserId.textContent = 'このユーザーIDは既に使われています';

  /*---------------------------------------------------------------*/

  const signupPasswordArea = createElementWithClasses(
    'div',
    'signupPasswordArea'
  );

  const signupPasswordAreaTitle = createElementWithClasses(
    'h3',
    'signupPasswordAreaTitle'
  );
  signupPasswordAreaTitle.textContent = 'パスワード';

  const signupPasswordOuter = createElementWithClasses(
    'div',
    'signupPasswordOuter'
  );

  const signupPasswordInput = createElementWithClasses(
    'input',
    'signupPasswordInput'
  );
  signupPasswordInput.type = 'password';
  signupPasswordInput.maxlength = '20';

  const signupPasswordInner = createElementWithClasses(
    'div',
    'signupPasswordInner'
  );

  const passwordCheckIcon = createElementWithClasses(
    'i',
    'passwordCheckIcon',
    'isHidden',
    'fa-solid',
    'fa-check'
  );

  const passwordCrossIcon = createElementWithClasses(
    'i',
    'passwordCrossIcon',
    'isHidden',
    'fa-solid',
    'fa-xmark'
  );

  const passwordErrorContainer = createElementWithClasses(
    'div',
    'passwordErrorContainer'
  );

  const signupPasswordDiscription = createElementWithClasses(
    'p',
    'signupPasswordDiscription'
  );
  signupPasswordDiscription.textContent =
    '半角英数字5文字以上15文字以下で登録してください';

  const passwordRequired = createElementWithClasses(
    'p',
    'passwordRequired',
    'errorMessage',
    'isHidden'
  );
  passwordRequired.textContent = 'パスワードが入力されていません';

  const passwordTooShort = createElementWithClasses(
    'p',
    'passwordTooShort',
    'errorMessage',
    'isHidden'
  );
  passwordTooShort.textContent = 'パスワードは5文字以上で登録してください';

  /*---------------------------------------------------------------*/
  const signupFormInBtn = createElementWithClasses('button', 'signupFormInBtn');
  signupFormInBtn.type = 'submit';
  signupFormInBtn.textContent = '登録';

  signupForm.append(
    signupFormSectionTitle,
    signupUserNameArea,
    signupUserIdArea,
    signupPasswordArea,
    signupFormInBtn
  );

  signupUserNameArea.append(
    signupUserNameAreaTitle,
    signupUserNameOuter,
    signupUserNameDiscription,
    userNameErrorContainer
  );
  signupUserNameOuter.append(signupUserNameInput, signupUserNameInner);
  signupUserNameInner.append(userNameCheckIcon, userNameCrossIcon);
  userNameErrorContainer.append(userNameRequired, duplicateUserName);

  signupUserIdArea.append(
    signupUserIdAreaTitle,
    signupUserIdOuter,
    signupUserIdDiscription,
    userIdErrorContainer
  );
  signupUserIdOuter.append(signupUserIdInput, signupUserIdInner);
  signupUserIdInner.append(userIdCheckIcon, userIdCrossIcon);
  userIdErrorContainer.append(userIdRequired, userIdTooShort, duplicateUserId);

  signupPasswordArea.append(
    signupPasswordAreaTitle,
    signupPasswordOuter,
    signupPasswordDiscription,
    passwordErrorContainer
  );
  signupPasswordOuter.append(signupPasswordInput, signupPasswordInner);
  signupPasswordInner.append(passwordCheckIcon, passwordCrossIcon);
  passwordErrorContainer.append(passwordRequired, passwordTooShort);

  const overlayElement = createOverlayWithContent(signupForm);

  const elements = {
    signupUserNameInput: signupForm.querySelector('.signupUserNameInput'),
    signupUserIdInput: signupForm.querySelector('.signupUserIdInput'),
    signupPasswordInput: signupForm.querySelector('.signupPasswordInput'),
    userNameCheckIcon: signupForm.querySelector('.userNameCheckIcon'),
    userNameCrossIcon: signupForm.querySelector('.userNameCrossIcon'),
    userIdCheckIcon: signupForm.querySelector('.userIdCheckIcon'),
    userIdCrossIcon: signupForm.querySelector('.userIdCrossIcon'),
    passwordCheckIcon: signupForm.querySelector('.passwordCheckIcon'),
    passwordCrossIcon: signupForm.querySelector('.passwordCrossIcon'),
    signupUserNameDiscription: signupForm.querySelector(
      '.signupUserNameDiscription'
    ),
    signupUserIdDiscription: signupForm.querySelector(
      '.signupUserIdDiscription'
    ),
    signupPasswordDiscription: signupForm.querySelector(
      '.signupPasswordDiscription'
    ),
    errorMessage: signupForm.querySelector('.errorMessage'),
  };

  return {
    form: signupForm,
    overlayElement,
    elements: {
      signupUserNameInput,
      userNameCheckIcon,
      userNameCrossIcon,
      signupUserNameDiscription,
      userNameRequired,
      duplicateUserName,

      signupUserIdInput,
      userIdCheckIcon,
      userIdCrossIcon,
      signupUserIdDiscription,
      userIdRequired,
      userIdTooShort,
      duplicateUserId,

      signupPasswordInput,
      passwordCheckIcon,
      passwordCrossIcon,
      signupPasswordDiscription,
      passwordRequired,
      passwordTooShort,
    },
  };
}
