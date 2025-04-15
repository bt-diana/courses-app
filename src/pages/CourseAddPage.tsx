import { useEffect } from 'react';
import Loading from '../components/Loading/Loading';
import CourseAddEdit from '../components/CourseAddEdit/CourseAddEdit';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  getAuthors,
  getAuthorsStatus,
  getAuthorsError,
} from '../store';
import { fetchAuthors } from '../store/authorsSlice';
import { isFailed, isLoading, isIdle } from '../helpers/status';
import Error from '../components/Error/Error';

const CourseAddPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authors = useSelector(getAuthors);
  const authorsStatus = useSelector(getAuthorsStatus);
  const authorsError = useSelector(getAuthorsError);

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
    <CourseAddEdit authorsResource={authors} />
  );
};

export default CourseAddPage;
