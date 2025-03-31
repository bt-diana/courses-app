import {
  mockedCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useState } from 'react';

const mockedCurrentCoursesList = mockedCoursesList.map((course: Course) => ({
  ...course,
  authors: mockedAuthorsList
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name),
}));

const getMockedCurrentCourses = () => {
  if (localStorage.getItem('mockedCurrentCoursesListIds') === null) {
    localStorage.setItem(
      'mockedCurrentCoursesListIds',
      JSON.stringify(mockedCurrentCoursesList.map(({ id }) => id))
    );

    return mockedCurrentCoursesList;
  }

  const mockedCurrentCoursesListIds: string[] = JSON.parse(
    localStorage.getItem('mockedCurrentCoursesListIds')!
  );

  return mockedCurrentCoursesList.filter(({ id }) =>
    mockedCurrentCoursesListIds.includes(id)
  );
};

const setMockedCurrentCourses = (mockedNewCourseList: Course[]) => {
  localStorage.setItem(
    'mockedCurrentCoursesListIds',
    JSON.stringify(mockedNewCourseList.map(({ id }) => id))
  );
};

const CurrentCourses = () => {
  const [сurrentCoursesList, setCurrentCoursesList]: [
    Course[],
    React.Dispatch<React.SetStateAction<Course[]>>,
  ] = useState(getMockedCurrentCourses);

  return (
    <Courses
      courses={сurrentCoursesList}
      deleteCourse={(idToDelete: string) => {
        const newCourseList = сurrentCoursesList.filter(
          ({ id }) => id !== idToDelete
        );
        setMockedCurrentCourses(newCourseList);
        setCurrentCoursesList(newCourseList);
      }}
      restoreCourses={() => {
        setMockedCurrentCourses(mockedCurrentCoursesList);
        setCurrentCoursesList(mockedCurrentCoursesList);
      }}
    />
  );
};

export default CurrentCourses;
