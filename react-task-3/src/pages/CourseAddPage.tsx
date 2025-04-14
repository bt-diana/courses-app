import { AuthorResource } from '../types';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import getAuthors from '../api/getAuthors';
import CourseAddEdit from '../components/CourseAddEdit/CourseAddEdit';

const CourseAddPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authorsResource, setAuthorsResource] = useState<AuthorResource[]>();

  useEffect(() => {
    getAuthors()
      .then((authors) => {
        setAuthorsResource(authors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading || authorsResource == null ? (
    <Loading />
  ) : (
    <CourseAddEdit authorsResource={authorsResource} />
  );
};

export default CourseAddPage;
