import Courses from '../components/Courses/Courses';
import { useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import normalizeCourses from '../helpers/normalizeCourses';
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
import { fetchAuthors } from '../store/authorsSlice';
import { isFailed, isLoading, isIdle } from '../helpers/status';
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
    if (isIdle(coursesStatus)) {
      dispatch(fetchCourses());
    }
  }, [coursesStatus, dispatch]);

  useEffect(() => {
    if (isIdle(authorsStatus)) {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  return [coursesStatus, authorsStatus].some(isFailed) ? (
    <Error message={coursesError ?? authorsError!} />
  ) : [coursesStatus, authorsStatus].some(isLoading) ? (
    <Loading />
  ) : (
    <Courses courses={normalizeCourses(courses, authors)} />
  );
};

export default CoursesPage;
