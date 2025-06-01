export function createElementWithClasses(tag, ...classes) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
}

export function createInputField({
  type = 'text',
  placeholder = '',
  classes = [],
}) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.classList.add(...classes);
  return input;
}

export function createTextareaField({ placeholder = '', classes = [] }) {
  const textarea = document.createElement('textarea');
  textarea.placeholder = placeholder;
  textarea.classList.add(...classes);
  return textarea;
}

export function createButtonField({ type = 'button', classes = [] }) {
  const button = document.createElement('button');
  button.type = type;
  button.classList.add(...classes);
  return button;
}
