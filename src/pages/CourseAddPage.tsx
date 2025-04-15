import { useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import CourseAddEdit from '../components/CourseAddEdit/CourseAddEdit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getAuthorsStatus, getAuthorsError } from '../store';
import { clearCourseAuthors, fetchAuthors } from '../store/authorsSlice';
import { isFailed, isLoading, isIdle } from '../helpers/status';
import Error from '../components/Error/Error';

const CourseAddPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authorsStatus = useSelector(getAuthorsStatus);
  const authorsError = useSelector(getAuthorsError);

  useEffect(() => {
    dispatch(clearCourseAuthors());
  }, []);

  useEffect(() => {
    if (isIdle(authorsStatus)) {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  return isFailed(authorsStatus) ? (
    <Error message={authorsError!} />
  ) : isLoading(authorsStatus) ? (
    <Loading />
  ) : (
    <CourseAddEdit />
  );
};

export default CourseAddPage;
