import { API_AUTHORS_PATH } from '../variables';
const API_URL = import.meta.env.VITE_API_URL;

const getAuthors = () =>
  fetch(`${API_URL}/${API_AUTHORS_PATH}`, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });

const postAuthor = (name: string) =>
  fetch(`${API_URL}/${API_AUTHORS_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw Error(`${res.status}: ${res.statusText}`);
    }
    return res.json();
  });

const deleteAuthor = (idToDelete: string) =>
  fetch(`${API_URL}/${API_AUTHORS_PATH}/${idToDelete}`, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });

export { postAuthor, getAuthors, deleteAuthor };
