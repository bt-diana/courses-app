import { createContext } from 'react';
import { User } from '../types';

const CurrentUser = createContext<User | undefined>(undefined);

export default CurrentUser;
