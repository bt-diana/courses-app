import { CourseResource } from '../types';

const apiSecret = import.meta.env.VITE_API_SECRET;

const putCourse = (id: string, course: Omit<CourseResource, 'id'>) =>
  fetch(`https://${apiSecret}.mockapi.io/courses/course/${id}`, {
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
