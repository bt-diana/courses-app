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
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CourseInfoPage from './pages/CourseInfoPage';
import CourseAddPage from './pages/CourseAddPage';
import CourseEditPage from './pages/CourseEditPage';
import UserProvider from './components/UserProvider/UserProvider';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Layout className="layout">
          <Header />
          <Content className="content">
            <Routes>
              <Route path="/" element={<Navigate replace to="/courses" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<AuthenticatedRoute />}>
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseInfoPage />} />
                <Route path="/courses/add" element={<CourseAddPage />} />
                <Route path="/courses/:id/edit" element={<CourseEditPage />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </UserProvider>
    </Router>
  );
};

export default App;
