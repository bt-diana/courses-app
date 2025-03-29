import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import { Course } from '../../types';

interface CoursesProps {
  courses: Course[];
}

const Courses = ({ courses }: CoursesProps) => {
  if (courses?.length) {
    return (
      <>
        <div>Courses</div>
        <SearchBar />
        <CoursesList courses={courses} />
      </>
    );
  } else {
    return (
      <>
        <div>Courses(Empty)</div>
      </>
    );
  }
};

export default Courses;
