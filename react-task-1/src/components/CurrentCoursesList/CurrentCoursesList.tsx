import { mockCurrentCoursesList } from '../../assets/data/mockCoursesList';
import CoursesList from '../CoursesList/CoursesList';
import { Course } from '../../types';

const CurrentCoursesList = () => {
  const сurrentCoursesList: Course[] = mockCurrentCoursesList;
  return <CoursesList courses={сurrentCoursesList}/>;
};

export default CurrentCoursesList;
