const apiSecret = import.meta.env.VITE_API_SECRET;

const getAuthors = () =>
  fetch(`https://${apiSecret}.mockapi.io/courses/authors`, {
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
    })
    .catch((error) => {
      console.error(error);
    });

export default getAuthors;
