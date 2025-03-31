import {
  mockedCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useState } from 'react';

const mockCurrentCoursesList = mockedCoursesList.map((course: Course) => ({
  ...course,
  authors: mockedAuthorsList
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name),
}));

const getMockCurrentCourses = () => {
  const mockCurrentCoursesListIds: string[] = JSON.parse(
    localStorage.getItem('mockCurrentCoursesListIds')!
  );

  return mockCurrentCoursesList.filter(({ id }) =>
    mockCurrentCoursesListIds.includes(id)
  );
};

const CurrentCourses = () => {
  if (localStorage.getItem('mockCurrentCoursesListIds') === null) {
    localStorage.setItem(
      'mockCurrentCoursesListIds',
      JSON.stringify(mockedCoursesList.map(({ id }) => id))
    );
  }

  const [сurrentCoursesList, setCurrentCoursesList]: [
    Course[],
    React.Dispatch<React.SetStateAction<Course[]>>,
  ] = useState(getMockCurrentCourses);

  return (
    <Courses
      courses={сurrentCoursesList}
      deleteCourse={(idToDelete: string) => {
        localStorage.setItem(
          'mockCurrentCoursesListIds',
          JSON.stringify(
            сurrentCoursesList
              .filter(({ id }) => id !== idToDelete)
              .map(({ id }) => id)
          )
        );
        setCurrentCoursesList(getMockCurrentCourses);
      }}
      restoreCourses={() => {
        localStorage.setItem(
          'mockCurrentCoursesListIds',
          JSON.stringify(mockCurrentCoursesList.map(({ id }) => id))
        );
        setCurrentCoursesList(getMockCurrentCourses);
      }}
    />
  );
};

export default CurrentCourses;
