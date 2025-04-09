import './App.css';
import CurrentCourses from './components/CurrentCourses/CurrentCourses';
import CurrentCourse from './components/CurrentCourse/CurrentCourse';
import LoginForm from './components/LoginForm/LoginForm';
import Header from './components/Header/Header';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout, { Content } from 'antd/es/layout/layout';

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header />
        <Content className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate replace to="/courses" />} />
              <Route path="/login" element={<LoginForm />} />
              <Route element={<AuthenticatedRoute />}>
                <Route path="/courses" element={<CurrentCourses />} />
                <Route path="/courses/:id" element={<CurrentCourse />} />
              </Route>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
