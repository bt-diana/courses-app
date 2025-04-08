import {
  mockedCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';
import CourseInfo from '../CourseInfo/CourseInfo';
import { Course } from '../../types';
import { useParams } from 'react-router-dom';

const mockedCurrentCoursesList: Course[] = mockedCoursesList.map((course) => ({
  ...course,
  creationDate: course.creationDate.split('/').join('.'),
  duration: `${Math.floor(course.duration / 60)}:${Math.floor(course.duration % 60)} hours`,
  authors: mockedAuthorsList
    .filter(({ id }) => course.authors.includes(id))
    .map(({ name }) => name)
    .join(', '),
}));

const CurrentCourse = () => {
  const { id } = useParams();
  const courseData: Course = mockedCurrentCoursesList.filter(
    (course) => course.id === id
  )[0];

  return <CourseInfo courseData={courseData} />;
};

export default CurrentCourse;
