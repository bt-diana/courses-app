import { createContext } from 'react';
import { User } from '../types';

const CurrentUser = createContext<User | null>(null);

export default CurrentUser;
