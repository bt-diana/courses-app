import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUser from '../../contexts/currentUser';

const AuthenticatedRoute = () => {
  const user = useContext(CurrentUser);
  return user ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthenticatedRoute;
