const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const removeToken = () => {
  localStorage.removeItem('accessToken');
};

const getToken = () => {
  return localStorage.getItem('accessToken');
};

export { getToken, setToken, removeToken };
