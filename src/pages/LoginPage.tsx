import { useContext, useEffect, useState } from 'react';
import { authenticateUser } from '../api/user';
import LoginForm from '../components/LoginForm/LoginForm';
import SetCurrentUser from '../contexts/setCurrentUser';
import { getUser } from '../api/user';
import CurrentUser from '../contexts/currentUser';
import Loading from '../components/Loading/Loading';
import { Navigate } from 'react-router-dom';
import { getToken, setToken } from '../helpers/token';
const LoginPage = () => {
  const user = useContext(CurrentUser);
  const setUser = useContext(SetCurrentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser(token)
        .then(({ firstName, lastName }) => {
          setUser({ firstName, lastName });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const requestOnFinish = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return authenticateUser(username, password)
      .then((res) => {
        setToken(res.accessToken);
        return res;
      })
      .then((res) => {
        setUser({ firstName: res.firstName, lastName: res.lastName });
      })
      .catch((error) => {
        if (error.message.slice(0, 3) == 400) {
          throw Error('Wrong username or password.');
        } else {
          throw Error('Something went wrong. Try reloading the page');
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <LoginForm requestOnFinish={requestOnFinish} />;
};

export default LoginPage;
