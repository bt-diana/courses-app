import { Course, CourseResource, AuthorResource } from '../types';

const normalizeCourse = (
  course: CourseResource,
  authors: AuthorResource[]
): Course => ({
  ...course,
  creationDate: course.creationDate.split('/').join('.'),
  duration: `${Math.floor(course.duration / 60)}:${Math.floor(course.duration % 60)} hours`,
  authors: authors
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name)
    .join(', '),
});

export default normalizeCourse;
