import './UserSection.css';
import { Button } from 'antd';

interface UserSectionProps {
  loggedin: boolean;
  fullname?: string;
}

const UserSection = ({ loggedin, fullname }: UserSectionProps) => {
  return (
    <div className="user-section">
      {loggedin && <div>{fullname}</div>}
      <Button>{loggedin ? 'Logout' : 'Login'}</Button>
    </div>
  );
};

export default UserSection;
