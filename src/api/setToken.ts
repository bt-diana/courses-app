const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export default setToken;
