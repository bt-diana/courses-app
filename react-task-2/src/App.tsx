import './App.css';
import Header from './components/Header/Header';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout, { Content } from 'antd/es/layout/layout';
import Loading from './components/Loading/Loading';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseAddPage from './pages/CourseAddPage';
import CourseEditPage from './pages/CourseEditPage';
import { User } from './types';
import { useState } from 'react';
import CurrentUser from './contexts/currentUser';
import SetCurrentUser from './contexts/setCurrentUser';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <CurrentUser value={user}>
        <SetCurrentUser value={setUser}>
          <Layout className="layout">
            <Header />
            <Content className="content">
              <Routes>
                <Route path="/" element={<Navigate replace to="/courses" />} />
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <LoginPage />}
                />
                {/* <Route element={<AuthenticatedRoute />}>
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseInfo />} />
              <Route path="/courses/add" element={<CourseAddPage />} />
              <Route path="/courses/:id/edit" element={<CourseEditPage />} />
            </Route> */}
              </Routes>
            </Content>
          </Layout>
        </SetCurrentUser>
      </CurrentUser>
    </Router>
  );
};

export default App;
