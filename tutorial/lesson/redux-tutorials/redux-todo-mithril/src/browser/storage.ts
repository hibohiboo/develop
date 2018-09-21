const STORAGE_ID = 'todos-mithril';

export async function get() {
  return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'); // tslint:disable-line
}

export async function put(todos) {
  localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
}
