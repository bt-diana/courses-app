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
} from '../store';
import { fetchCourses } from '../store/coursesSlice';
import { isFailed, isLoading, isIdle } from '../helpers/status';
import Error from '../components/Error/Error';

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector(getCourses);
  const coursesStatus = useSelector(getCoursesStatus);
  const coursesError = useSelector(getCoursesError);

  useEffect(() => {
    if (isIdle(coursesStatus)) {
      dispatch(fetchCourses());
    }
  }, [coursesStatus, dispatch]);

  if (isFailed(coursesStatus)) {
    return <Error message={coursesError!} />;
  }

  if (isLoading(coursesStatus)) {
    return <Loading />;
  }

  return <Courses courses={normalizeCourses(courses)} />;
};

export default CoursesPage;
