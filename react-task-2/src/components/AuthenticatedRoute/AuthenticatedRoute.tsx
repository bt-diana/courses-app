import { Outlet, Navigate } from 'react-router-dom';

const AuthenticatedRoute = () => {
  const userToken = localStorage.getItem('userToken');
  return userToken ? <Outlet /> : <Navigate replace to="/login" />;
};

export default AuthenticatedRoute;
