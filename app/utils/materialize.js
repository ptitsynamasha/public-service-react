import M from 'materialize-css';

export function initCollapsible(node) {
  M.Collapsible.init(node);
}

export function initModal(node) {
  M.Modal.init(node);
}

export function openModal(node) {
  const instance = M.Modal.getInstance(node);
  instance.open();
}

export function closeModal(node) {
  const instance = M.Modal.getInstance(node);
  instance.close();
}

export function toast(errorCode = false, message = '') {
  let className = 'rounded lighten-1 ';
  switch (true) {
    case errorCode >= 200 && errorCode < 300:
      className += 'green';
      break;
    case errorCode >= 300 && errorCode < 400:
      className += 'light-blue';
      break;
    case errorCode >= 400 && errorCode < 500:
      className += 'purple';
      break;
    case errorCode >= 500:
      className += 'red';
      break;
    default:
  }
  M.toast({ html: message, classes: className });
}
