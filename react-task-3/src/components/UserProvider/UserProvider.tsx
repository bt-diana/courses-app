import { useState, ReactNode } from 'react';
import { User } from '../../types';
import CurrentUser from '../../contexts/currentUser';
import SetCurrentUser from '../../contexts/setCurrentUser';

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <CurrentUser value={user}>
      <SetCurrentUser value={setUser}>{children}</SetCurrentUser>
    </CurrentUser>
  );
};

export default UserProvider;
