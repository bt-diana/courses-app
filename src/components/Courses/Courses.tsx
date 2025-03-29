import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import { Course } from '../../types';
import { Button } from 'antd';

interface CoursesProps {
  courses: Course[];
}

const Courses = ({ courses }: CoursesProps) => {
  if (courses?.length) {
    return (
      <div>
        <SearchBar />
        <AddNewCourseButton />
        <CoursesList courses={courses} />
      </div>
    );
  } else {
    return (
      <div>
        <div>Your list is empty</div>
        <div>
          Please use &apos;Add New Course&apos; button to add your first course
        </div>
        <AddNewCourseButton />
      </div>
    );
  }
};

export default Courses;
