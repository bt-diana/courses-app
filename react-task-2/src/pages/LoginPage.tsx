import authenticateUser from '../api/authenticateUser';
import LoginForm from '../components/LoginForm/LoginForm';
import { User } from '../types';

interface LoginPageProps {
  setUser: (newUser: User) => void;
}

const LoginPage = ({ setUser }: LoginPageProps) => {
  const requestOnFinish = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return authenticateUser(username, password)
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

  return <LoginForm requestOnFinish={requestOnFinish} />;
};

export default LoginPage;
