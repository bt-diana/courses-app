import './Header.css';
import { Layout } from 'antd';
import Account from '../Account/Account';
import logo from '/src/assets/images/logo.svg';

interface HeaderProps {
  logout: () => void;
}

const Header = ({ logout }: HeaderProps) => {
  return (
    <Layout.Header className="header">
      <img src={logo} alt="logo" />
      <Account logout={logout} />
    </Layout.Header>
  );
};

export default Header;
