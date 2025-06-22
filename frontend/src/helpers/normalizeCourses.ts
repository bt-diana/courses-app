import { Course, CourseResource } from '../types';
import normalizeCourse from './normalizeCourse';

const normalizeCourses = (courses: CourseResource[]): Course[] => {
  return courses.map((course) => normalizeCourse(course));
};

export default normalizeCourses;
