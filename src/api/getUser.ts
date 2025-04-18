const getUser = (accessToken: string) => {
  return fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`${res.status}: ${res.statusText}`);
      }
    })
    .then(({ firstName, lastName }) => {
      return { firstName, lastName };
    });
};

export default getUser;
