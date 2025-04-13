import { Course, CourseResource, AuthorResource } from '../types';
import normalizeDuration from './normalizeDuration';

const normalizeCourse = (
  course: CourseResource,
  authors: AuthorResource[]
): Course => ({
  ...course,
  creationDate: course.creationDate.split('/').join('.'),
  duration: normalizeDuration(course.duration),
  authors: authors
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name)
    .join(', '),
});

export default normalizeCourse;
