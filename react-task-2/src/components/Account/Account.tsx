import { useContext } from 'react';
import CurrentUser from '../../contexts/currentUser';
import UserSection from '../UserSection/UserSection';
import SetCurrentUser from '../../contexts/setCurrentUser';
import removeToken from '../../api/removeToken';

const Account = () => {
  const user = useContext(CurrentUser);
  const setUser = useContext(SetCurrentUser);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return user ? (
    <UserSection
      logout={logout}
      fullname={user.firstName + ' ' + user.lastName}
    />
  ) : (
    <></>
  );
};

export default Account;
