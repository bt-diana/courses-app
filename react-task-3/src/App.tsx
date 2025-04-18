import './App.css';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CourseInfoPage from './pages/CourseInfoPage';
import CourseAddPage from './pages/CourseAddPage';
import CourseEditPage from './pages/CourseEditPage';
import UserProvider from './components/UserProvider/UserProvider';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Layout>
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
        </Layout>
      </UserProvider>
    </Router>
  );
};

export default App;
