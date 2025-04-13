import Courses from '../components/Courses/Courses';
import { Course } from '../types';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import normalizeCourses from '../helpers/normalizeCourses';
import DeleteCourse from '../contexts/deleteCurrentCourse';
import getCourses from '../api/getCourses';
import getAuthors from '../api/getAuthors';
import deleteCourse from '../api/deleteCourse';

const CoursesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [сurrentCourses, setCurrentCourses] = useState<Course[]>();

  useEffect(() => {
    getCourses()
      .then((courses) => {
        getAuthors().then((authors) => {
          setCurrentCourses(normalizeCourses(courses, authors));
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteCurrentCourse = (idToDelete: string) => {
    setIsLoading(true);
    deleteCourse(idToDelete)
      .then(() => {
        setCurrentCourses(
          сurrentCourses?.filter(({ id }) => id !== idToDelete)
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return isLoading || сurrentCourses == null ? (
    <Loading />
  ) : (
    <DeleteCourse value={deleteCurrentCourse}>
      <Courses courses={сurrentCourses} />
    </DeleteCourse>
  );
};

export default CoursesPage;
