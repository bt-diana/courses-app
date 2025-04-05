import { mockUser } from '../../assets/data/mockUser';
import UserSection from '../UserSection/UserSection';

const Account = () => {
  const user = mockUser;
  return <UserSection loggedin fullname={user.name} />;
};

export default Account;
