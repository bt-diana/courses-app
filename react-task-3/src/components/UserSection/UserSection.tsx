import './UserSection.css';
import { Button } from 'antd';

interface UserSectionProps {
  fullname?: string;
  logout: () => void;
}

const UserSection = ({ fullname, logout }: UserSectionProps) => {
  return (
    <div className="user-section">
      <div>{fullname}</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default UserSection;
