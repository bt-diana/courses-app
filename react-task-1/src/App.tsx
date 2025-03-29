import { useState } from 'react';
import './App.css';
import CurrentCourses from './components/CurrentCourses/CurrentCourses';
import Header from './components/Header/Header';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { Layout } from 'antd';
enum PAGES {
  courses,
  courseInfo,
}

const App = () => {
  const [page, setPage] = useState(PAGES.courses);

  return (
    <>
      <Layout>
        <Header />
        <Layout.Content>
          <div className="content">
            {page === PAGES.courses && <CurrentCourses />}
            {page === PAGES.courseInfo && <CourseInfo />}
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default App;
