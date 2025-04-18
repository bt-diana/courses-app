import { Course } from '../types';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import normalizeCourse from '../helpers/normalizeCourse';
import { getCourse } from '../api/courses';
import { getAuthors } from '../api/authors';
import CourseInfo from '../components/CourseInfo/CourseInfo';

const CourseInfoPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseData, setCourseData] = useState<Course>();

  useEffect(() => {
    getCourse(id!)
      .then((course) => {
        getAuthors().then((authors) => {
          setCourseData(normalizeCourse(course, authors));
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return isLoading || courseData == null ? (
    <Loading />
  ) : (
    <CourseInfo courseData={courseData} />
  );
};

export default CourseInfoPage;
