import './Header.css';
import { Layout } from 'antd';
import Account from '../Account/Account';

const Header = () => {
  return (
    <Layout.Header className="header">
      <img src="/src/assets/images/logo.svg" alt="logo" />
      <Account />
    </Layout.Header>
  );
};

export default Header;
