const accessToken = localStorage.getItem('accessToken');

const getUser = () =>
  fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then(({ firstName, lastName }) => {
      return { firstName, lastName };
    })
    .catch((error) => {
      console.log(error);
    });

export default getUser;
