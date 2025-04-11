import { createContext } from 'react';

const DeleteCourse = createContext<(idToDelete: string) => void>(() => {});

export default DeleteCourse;
