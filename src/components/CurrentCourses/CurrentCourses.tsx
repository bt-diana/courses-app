import { mockCurrentCoursesList } from '../../assets/data/mockCoursesList';
import Courses from '../Courses/Courses';
import { Course } from '../../types';

const CurrentCourses = () => {
  const сurrentCoursesList: Course[] = mockCurrentCoursesList;
  return <Courses courses={сurrentCoursesList} />;
};

export default CurrentCourses;
