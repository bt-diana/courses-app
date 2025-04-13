import { createContext } from 'react';
import { User } from '../types';

const SetCurrentUser = createContext<(user: User | null) => void>(() => {});

export default SetCurrentUser;
