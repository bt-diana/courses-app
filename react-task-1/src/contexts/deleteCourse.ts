import { createContext } from 'react';

const DeleteCourse = createContext<(id: string) => void>(() => {});

export default DeleteCourse;
