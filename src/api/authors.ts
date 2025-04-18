const API_URL = import.meta.env.VITE_API_URL;

const getAuthors = () =>
  fetch(`${API_URL}/authors`, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });

const postAuthor = (name: string) =>
  fetch(`${API_URL}/authors`, {
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

export { postAuthor, getAuthors };
