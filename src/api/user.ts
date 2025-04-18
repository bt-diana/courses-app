const authenticateUser = (username: string, password: string) => {
  return fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });
};

const getUser = (accessToken: string) => {
  return fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error(`${res.status}: ${res.statusText}`);
    }
  });
};

export { getUser, authenticateUser };
