import { useState } from 'react';
import './App.css';
import CurrentCourses from './components/CurrentCourses/CurrentCourses';
import Header from './components/Header/Header';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { Layout } from 'antd';
import { Course } from './types';

const App = () => {
  const [course, setCourse] = useState<Course | null>(null);

  return (
    <Layout className="layout">
      <Header />
      <Layout.Content className="main">
        <div className="content">
          {course === null && (
            <CurrentCourses
              openCourse={(course: Course) => {
                setCourse(course);
              }}
            />
          )}
          {course !== null && <CourseInfo courseData={course} />}
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default App;
