import {
  mockedCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useState } from 'react';
import DeleteCourse from '../../contexts/deleteCourse';

const mockedCurrentCoursesList: Course[] = mockedCoursesList.map((course) => ({
  ...course,
  creationDate: course.creationDate.split('/').join('.'),
  duration: `${Math.floor(course.duration / 60)}:${Math.floor(course.duration % 60)} hours`,
  authors: mockedAuthorsList
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name)
    .join(', '),
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
    <DeleteCourse
      value={(idToDelete: string) => {
        const newCourseList = сurrentCoursesList.filter(
          ({ id }) => id !== idToDelete
        );
        setMockedCurrentCourses(newCourseList);
        setCurrentCoursesList(newCourseList);
      }}
    >
      <Courses
        courses={сurrentCoursesList}
        restoreCourses={() => {
          setMockedCurrentCourses(mockedCurrentCoursesList);
          setCurrentCoursesList(mockedCurrentCoursesList);
        }}
      />
    </DeleteCourse>
  );
};

export default CurrentCourses;
