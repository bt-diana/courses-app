import { useContext } from 'react';
import CurrentUser from '../../contexts/currentUser';
import UserSection from '../UserSection/UserSection';

interface AccountProps {
  logout: () => void;
}

const Account = ({ logout }: AccountProps) => {
  const user = useContext(CurrentUser);
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
