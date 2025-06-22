import { CourseResource } from '../types';
import processResponse from '../helpers/processResponse';

const API_URL = process.env.VITE_API_URL!;
const API_COURSES_PATH = process.env.VITE_API_COURSES_PATH!;

const deleteCourse = (idToDelete: string) =>
  fetch(API_URL + API_COURSES_PATH + '/' + idToDelete, {
    method: 'DELETE',
  }).then((res) => {
    return processResponse(res);
  });

const getCourse = (id: string) =>
  fetch(API_URL + API_COURSES_PATH + '/' + id, {
    method: 'GET',
  }).then(async (res) => {
    const data = await processResponse(res);
    return { ...data, creationDate: new Date(data.creationDate) };
  });

const getCourses = () =>
  fetch(API_URL + API_COURSES_PATH, {
    method: 'GET',
  }).then(async (res) => {
    const data = await processResponse(res);
    return data.map((element: CourseResource) => ({
      ...element,
      creationDate: new Date(element.creationDate),
    }));
  });

const postCourse = (course: Omit<CourseResource, 'id'>) =>
  fetch(API_URL + API_COURSES_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then(async (res) => {
    const data = await processResponse(res);
    return { ...data, creationDate: new Date(data.creationDate) };
  });

const putCourse = (id: string, course: Omit<CourseResource, 'id'>) =>
  fetch(API_URL + API_COURSES_PATH + '/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then(async (res) => {
    const data = await processResponse(res);
    return { ...data, creationDate: new Date(data.creationDate) };
  });

export { putCourse, postCourse, getCourses, getCourse, deleteCourse };
