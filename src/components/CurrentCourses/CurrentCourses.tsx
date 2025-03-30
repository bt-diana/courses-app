import {
  mockCurrentCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';

const CurrentCourses = () => {
  const сurrentCoursesList: Course[] = mockCurrentCoursesList.map((course) => ({
    ...course,
    authors: mockedAuthorsList
      .filter(({ id }) => course.authors.includes(id))
      .map(({ name }) => name),
  }));
  return <Courses courses={сurrentCoursesList} />;
};

export default CurrentCourses;
