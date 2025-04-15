import Courses from '../components/Courses/Courses';
import { useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import normalizeCourses from '../helpers/normalizeCourses';
import DeleteCourse from '../contexts/deleteCurrentCourse';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  getCourses,
  getCoursesStatus,
  getCoursesError,
  getAuthors,
  getAuthorsStatus,
  getAuthorsError,
} from '../store';
import { fetchCourses } from '../store/coursesSlice';
import { Status } from '../types';
import { fetchAuthors } from '../store/authorsSlice';
import { isFailed, isLoading } from '../helpers/status';
import Error from '../components/Error/Error';

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector(getCourses);
  const coursesStatus = useSelector(getCoursesStatus);
  const coursesError = useSelector(getCoursesError);

  const authors = useSelector(getAuthors);
  const authorsStatus = useSelector(getAuthorsStatus);
  const authorsError = useSelector(getAuthorsError);

  useEffect(() => {
    if (coursesStatus === Status.idle) {
      dispatch(fetchCourses());
    }
  }, [coursesStatus, dispatch]);

  useEffect(() => {
    if (authorsStatus === Status.idle) {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  const deleteCurrentCourse = (idToDelete: string) => {
    // setIsLoading(true);
    // deleteCourse(idToDelete)
    //   .then(() => {
    //     setCurrentCourses(
    //       сurrentCourses?.filter(({ id }) => id !== idToDelete)
    //     );
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return [coursesStatus, authorsStatus].some(isFailed) ? (
    <Error message={coursesError ?? authorsError!} />
  ) : [coursesStatus, authorsStatus].some(isLoading) ? (
    <Loading />
  ) : (
    <DeleteCourse value={deleteCurrentCourse}>
      <Courses courses={normalizeCourses(courses, authors)} />
    </DeleteCourse>
  );
};

export default CoursesPage;
