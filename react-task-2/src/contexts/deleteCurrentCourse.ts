import { createContext } from 'react';

const DeleteCurrentCourse = createContext<(idToDelete: string) => void>(
  () => {}
);

export default DeleteCurrentCourse;
