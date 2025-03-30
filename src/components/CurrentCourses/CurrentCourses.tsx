import {
  mockCurrentCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useState } from 'react';

const CurrentCourses = () => {
  const [сurrentCoursesList, setCurrentCoursesList]: [
    Course[],
    React.Dispatch<React.SetStateAction<Course[]>>,
  ] = useState(
    mockCurrentCoursesList.map((course) => ({
      ...course,
      authors: mockedAuthorsList
        .filter(({ id }) => course.authors.includes(id))
        .map(({ name }) => name),
    }))
  );

  return (
    <Courses
      courses={сurrentCoursesList}
      deleteCourse={(idToDelete: string) => {
        setCurrentCoursesList(
          сurrentCoursesList.filter(({ id }) => id !== idToDelete)
        );
      }}
    />
  );
};

export default CurrentCourses;
