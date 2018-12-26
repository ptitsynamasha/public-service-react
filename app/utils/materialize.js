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
