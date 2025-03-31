import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import { Course } from '../../types';
import { useState } from 'react';
interface CoursesProps {
  courses: Course[];
  openCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  restoreCourses: () => void;
}

const Courses = ({
  courses,
  openCourse,
  deleteCourse,
  restoreCourses,
}: CoursesProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  if (courses?.length) {
    return (
      <div className="courses">
        <div className="courses-options">
          <SearchBar
            searchCourse={(value) => {
              setSearchValue(value.toLowerCase());
            }}
          />
          <AddNewCourseButton />
        </div>
        <CoursesList
          courses={courses.filter(
            ({ title, description }) =>
              title.toLowerCase().includes(searchValue) ||
              description.toLowerCase().includes(searchValue)
          )}
          openCourse={openCourse}
          deleteCourse={deleteCourse}
        />
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
