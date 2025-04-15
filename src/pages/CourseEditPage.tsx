import { CourseResource } from '../types';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import getCourse from '../api/getCourse';
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

const CourseEditPage = () => {
  const { id } = useParams();
  const [courseIsLoading, setCourseIsLoading] = useState<boolean>(true);
  const [courseResource, setCourseResource] = useState<CourseResource>();

  const dispatch = useDispatch<AppDispatch>();

  const authors = useSelector(getAuthors);
  const authorsStatus = useSelector(getAuthorsStatus);
  const authorsError = useSelector(getAuthorsError);

  useEffect(() => {
    getCourse(id!)
      .then((course) => {
        setCourseResource(course);
      })
      .finally(() => {
        setCourseIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (isIdle(authorsStatus)) {
      dispatch(fetchAuthors());
    }
  }, [authorsStatus, dispatch]);

  return isFailed(authorsStatus) ? (
    <Error message={authorsError!} />
  ) : courseIsLoading || courseResource == null || isLoading(authorsStatus) ? (
    <Loading />
  ) : (
    <CourseAddEdit courseResource={courseResource} authorsResource={authors} />
  );
};

export default CourseEditPage;
