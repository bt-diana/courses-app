import { useState } from 'react';
import './App.css';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CourseInfo from './components/CourseInfo/CourseInfo';

enum PAGES {
  courses,
  courseInfo,
}

const App = () => {
  const [page, setPage] = useState(PAGES.courses);

  return (
    <>
      <Header />
      {page === PAGES.courses && <Courses />}
      {page === PAGES.courseInfo && <CourseInfo />}
    </>
  );
};

export default App;
