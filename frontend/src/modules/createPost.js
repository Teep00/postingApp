import { createPostElement } from '../core/postManager.js';
import { createPostForm } from '../utils/domFactory.js';
import {
  showError,
  resetAllErrors,
  errorMessage,
} from '../utils/errorMessage.js';
import { postsButtonVisibility } from '../utils/postView.js';

// 新規投稿作成
export function newPostCreate(newPostCreateBtn) {
  newPostCreateBtn.addEventListener('click', () => {
    const { form: postForm, overlayElement, elements } = createPostForm();
    const { newTitle, newMainText, postFormInBtn } = elements;

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      resetAllErrors(postForm);

      const title = newTitle.value.trim();
      const body = newMainText.value.trim();

      let hasError = false;

      if (!title) {
        showError(postForm, '.titleRequired', errorMessage.titleRequired);
        hasError = true;
      }
      if (!body) {
        showError(postForm, '.mainTextRequired', errorMessage.mainTextRequired);
        hasError = true;
      }

      const id = Math.random().toString(36).slice(-8);

      if (hasError) return;

      if (postFormInBtn.disabled) return;

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      sessionStorage.setItem('newPostInProgress', 'true');

      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          body,
          userName: currentUser.userName,
          userId: currentUser.userId,
          createdAt: new Date().toISOString(),
          likes: [],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          createPostElement({
            ...data,
            userName: currentUser.userName,
            userId: currentUser.userId,
            createdAt: new Date().toISOString(),
          });
          postsButtonVisibility(true);
          overlayElement.remove();

          sessionStorage.setItem('suppressWelcomeToast', 'true');
        })
        .catch((err) => console.error(err.message));
    });
  });
}
