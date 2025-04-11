import { Course } from '../../types';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import CourseInfo from '../CourseInfo/CourseInfo';
import { useParams } from 'react-router-dom';
import normalizeCourse from '../../helpers/normalizeCourse';

const apiSecret = import.meta.env.VITE_API_SECRET;

const CurrentCourses = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseData, setCourseData] = useState<Course>();

  useEffect(() => {
    fetch(`https://${apiSecret}.mockapi.io/courses/course/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then((course) => {
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
            setCourseData(normalizeCourse(course, authors));
          });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? <Loading /> : <CourseInfo courseData={courseData!} />;
};

export default CurrentCourses;
