import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import { Course } from '../../types';
interface CoursesProps {
  courses: Course[];
  deleteCourse: (id: string) => void;
  restoreCourses: () => void;
}

const Courses = ({ courses, deleteCourse, restoreCourses }: CoursesProps) => {
  if (courses?.length) {
    return (
      <div className="courses">
        <div className="courses-options">
          <SearchBar />
          <AddNewCourseButton />
        </div>
        <CoursesList courses={courses} deleteCourse={deleteCourse} />
      </div>
    );
  } else {
    return (
      <div className="courses">
        <div className="courses-empty">
          <div>Your list is empty</div>
          <div>
            Please use &apos;Add New Course&apos; button to add your first
            course
          </div>
          <AddNewCourseButton restoreCourses={restoreCourses} />
        </div>
      </div>
    );
  }
};

export default Courses;
