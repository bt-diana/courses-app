import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import normalizeCourses from '../../helpers/normalizeCourses';

const apiSecret = import.meta.env.VITE_API_SECRET;

const CurrentCourses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [сurrentCourses, setCurrentCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(`https://${apiSecret}.mockapi.io/courses/course`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then((courses) => {
        return fetch(`https://${apiSecret}.mockapi.io/courses/authors`, {
          method: 'GET',
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw Error();
            }
          })
          .then((authors) => {
            const normalizedCourses = normalizeCourses(courses, authors);
            setCurrentCourses(normalizedCourses);
          });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const deleteCourse = () => {};

  return isLoading ? (
    <Loading />
  ) : (
    <Courses courses={сurrentCourses} /*deleteCourse={deleteCourse}*/ />
  );
};

export default CurrentCourses;
