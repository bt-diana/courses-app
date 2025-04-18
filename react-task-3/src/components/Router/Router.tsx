import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import CoursesPage from '../../pages/CoursesPage';
import CourseInfoPage from '../../pages/CourseInfoPage';
import CourseAddPage from '../../pages/CourseAddPage';
import CourseEditPage from '../../pages/CourseEditPage';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Navigate replace to="courses" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="courses" element={<AuthenticatedRoute />}>
          <Route index element={<CoursesPage />} />
          <Route path=":id" element={<CourseInfoPage />} />
          <Route path="add" element={<CourseAddPage />} />
          <Route path=":id/edit" element={<CourseEditPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
