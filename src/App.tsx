import './App.css';
import CurrentCourses from './components/CurrentCourses/CurrentCourses';
import CurrentCourse from './components/CurrentCourse/CurrentCourse';
import Authentication from './components/Authentication/Authentication';
import Header from './components/Header/Header';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout, { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { User } from './types';
import CurrentUser from './contexts/currentUser';
import LoginForm from './components/LoginForm/LoginForm';
import type { FormProps } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
};

const App = () => {
  const [user, setUser] = useState<User>();

  const accessToken = localStorage.getItem('accessToken');
  if (!user && accessToken) {
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('got user!');
        setUser({ firstName: res.firstName, lastName: res.lastName });
      });
  }

  const authenticateUser = (username: string, password: string) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      })
      .then((res) => {
        setUser({ firstName: res.firstName, lastName: res.lastName });
      });
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    authenticateUser(values.username!, values.password!);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Router>
      <CurrentUser value={user}>
        <Layout className="layout">
          <Header />
          <Content className="main">
            <div className="content">
              <Routes>
                <Route path="/" element={<Navigate replace to="/courses" />} />
                <Route
                  path="/login"
                  element={
                    user ? (
                      <Navigate replace to="/courses" />
                    ) : (
                      <LoginForm
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                      />
                    )
                  }
                />
                <Route element={<AuthenticatedRoute />}>
                  <Route path="/courses" element={<CurrentCourses />} />
                  <Route path="/courses/:id" element={<CurrentCourse />} />
                </Route>
              </Routes>
            </div>
          </Content>
        </Layout>
      </CurrentUser>
    </Router>
  );
};

export default App;
