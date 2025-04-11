import Courses from '../Courses/Courses';
import { Course } from '../../types';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import normalizeCourses from '../../helpers/normalizeCourses';
import DeleteCourse from '../../contexts/deleteCourse';

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
            setCurrentCourses(normalizeCourses(courses, authors));
          });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteCourse = (idToDelete: string) => {
    setIsLoading(true);
    fetch(`https://${apiSecret}.mockapi.io/courses/course/${idToDelete}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
      })
      .then(() => {
        setCurrentCourses(сurrentCourses.filter(({ id }) => id !== idToDelete));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <DeleteCourse value={deleteCourse}>
      <Courses courses={сurrentCourses} />
    </DeleteCourse>
  );
};

export default CurrentCourses;
