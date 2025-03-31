import './Header.css';
import { Layout } from 'antd';
import Account from '../Account/Account';
import logo from '/src/assets/images/logo.svg';

const Header = () => {
  return (
    <Layout.Header className="header">
      <img src={logo} alt="logo" />
      <Account />
    </Layout.Header>
  );
};

export default Header;
