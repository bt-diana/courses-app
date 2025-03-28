import CoursesList from '../CoursesList/CoursesList';
import SearchBar from '../SearchBar/SearchBar';
import './Courses.css';
import {
  mockCurrentCoursesList,
  mockedAuthorsList,
} from '../../assets/data/mockCoursesList';

const Courses = () => {
  if (mockCurrentCoursesList?.length) {
    return (
      <>
        <div>Courses</div>
        <SearchBar />
        <CoursesList courses={mockCurrentCoursesList} />
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
