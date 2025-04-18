import { Outlet, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import SetCurrentUser from '../../contexts/setCurrentUser';
import { getUser } from '../../api/user';
import Loading from '../Loading/Loading';
import CurrentUser from '../../contexts/currentUser';
import { getToken } from '../../helpers/token';

const AuthenticatedRoute = () => {
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

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
