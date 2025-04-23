import { API_COURSES_PATH } from '../variables';
import { CourseResource } from '../types';
import processResponse from '../helpers/processResponse';

const API_URL = import.meta.env.VITE_API_URL;

const deleteCourse = (idToDelete: string) =>
  fetch(`${API_URL}/${API_COURSES_PATH}/${idToDelete}`, {
    method: 'DELETE',
  }).then((res) => processResponse(res));

const getCourse = (id: string) =>
  fetch(`${API_URL}/${API_COURSES_PATH}/${id}`, {
    method: 'GET',
  }).then((res) => processResponse(res));

const getCourses = () =>
  fetch(`${API_URL}/${API_COURSES_PATH}`, {
    method: 'GET',
  }).then((res) => processResponse(res));

const postCourse = (course: Omit<CourseResource, 'id'>) =>
  fetch(`${API_URL}/${API_COURSES_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then((res) => processResponse(res));

const putCourse = (id: string, course: Omit<CourseResource, 'id'>) =>
  fetch(`${API_URL}/${API_COURSES_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then((res) => {
    if (!res.ok) {
      throw Error(`${res.status}: ${res.statusText}`);
    }
    return res.json();
  });

export { putCourse, postCourse, getCourses, getCourse, deleteCourse };
