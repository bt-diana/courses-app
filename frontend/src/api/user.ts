const AUTH_URL = process.env.VITE_AUTH_URL!;
const AUTH_LOGIN_PATH = process.env.VITE_AUTH_LOGIN_PATH!;
const AUTH_USER_PATH = process.env.VITE_AUTH_USER_PATH!;

const authenticateUser = (username: string, password: string) => {
  return fetch(AUTH_URL + AUTH_LOGIN_PATH, {
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
  return fetch(AUTH_URL + AUTH_USER_PATH, {
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
