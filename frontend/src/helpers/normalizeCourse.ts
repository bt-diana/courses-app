import { Course, CourseResource } from '../types';
import normalizeDuration from './normalizeDuration';

const normalizeCourse = (course: CourseResource): Course => ({
  ...course,
  creationDate: course.creationDate.split('/').join('.'),
  duration: normalizeDuration(course.duration),
  authors: course.authors.map(({ name }) => name).join(', '),
});

export default normalizeCourse;
