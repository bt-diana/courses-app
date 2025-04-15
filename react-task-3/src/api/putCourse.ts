import { CourseResource } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const putCourse = (id: string, course: Omit<CourseResource, 'id'>) =>
  fetch(`${API_URL}/course/${id}`, {
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

export default putCourse;
