import { Course, CourseResource } from '../types';
import normalizeDuration from './normalizeDuration';

const formatDate = (d: Date): string => {
  return (
    (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) +
    '.' +
    (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) +
    '.' +
    d.getFullYear()
  );
};

const normalizeCourse = (course: CourseResource): Course => ({
  ...course,
  creationDate: formatDate(course.creationDate),
  duration: normalizeDuration(course.duration),
  authors: course.authors.map(({ name }) => name).join(', '),
});

export default normalizeCourse;
