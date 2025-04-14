import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import { Course } from '../../types';
import { useState } from 'react';
import EmptyCoursesList from '../EmptyCoursesList/EmptyCoursesList';
interface CoursesProps {
  courses: Course[];
}

const Courses = ({ courses }: CoursesProps) => {
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
        />
      </div>
    );
  } else {
    return (
      <div className="courses-empty">
        <EmptyCoursesList />
      </div>
    );
  }
};

export default Courses;
