import { AuthorResource, CourseResource } from '../types';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import getCourse from '../api/getCourse';
import getAuthors from '../api/getAuthors';
import CourseAddEdit from '../components/CourseAddEdit/CourseAddEdit';

const CourseEditPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseResource, setCourseResource] = useState<CourseResource>();
  const [authorsResource, setAuthorsResource] = useState<AuthorResource[]>();

  useEffect(() => {
    getCourse(id!)
      .then((course) => {
        getAuthors().then((authors) => {
          setCourseResource(course);
          setAuthorsResource(authors);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return isLoading || courseResource == null || authorsResource == null ? (
    <Loading />
  ) : (
    <CourseAddEdit
      courseResource={courseResource}
      authorsResource={authorsResource}
    />
  );
};

export default CourseEditPage;
