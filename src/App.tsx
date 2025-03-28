import { useState } from 'react';
import './App.css';
import Courses from './components/Courses/Courses';
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
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content>
          {page === PAGES.courses && <Courses />}
          {page === PAGES.courseInfo && <CourseInfo />}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default App;
