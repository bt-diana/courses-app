const apiSecret = import.meta.env.VITE_API_SECRET;

const postAuthor = (name: string) =>
  fetch(`https://${apiSecret}.mockapi.io/courses/authors`, {
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

export default postAuthor;
