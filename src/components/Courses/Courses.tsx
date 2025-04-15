import './Courses.css';
import SearchBar from '../SearchBar/SearchBar';
import CoursesList from '../CoursesList/CoursesList';
import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import { useState } from 'react';
import EmptyCoursesList from '../EmptyCoursesList/EmptyCoursesList';
import { useSelector } from 'react-redux';
import normalizeCourses from '../../helpers/normalizeCourses';

const Courses = () => {
  const courses = normalizeCourses(
    useSelector((state) => state.courses.data),
    useSelector((state) => state.authors.data)
  );

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
