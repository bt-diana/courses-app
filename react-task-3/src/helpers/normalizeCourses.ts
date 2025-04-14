import { Course, CourseResource, AuthorResource } from '../types';
import normalizeCourse from './normalizeCourse';

const normalizeCourses = (
  courses: CourseResource[],
  authors: AuthorResource[]
): Course[] => {
  return courses.map((course) => normalizeCourse(course, authors));
};

export default normalizeCourses;
