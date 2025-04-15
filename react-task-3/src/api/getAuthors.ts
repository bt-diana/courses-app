const API_URL = import.meta.env.VITE_API_URL;

const getAuthors = () =>
  fetch(`${API_URL}/authors`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`${res.status}: ${res.statusText}`);
      }
    })
    .then((authors) => {
      return authors;
    });

export default getAuthors;
