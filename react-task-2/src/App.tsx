import './App.css';
import CurrentCourses from './components/CurrentCourses/CurrentCourses';
import CurrentCourse from './components/CurrentCourse/CurrentCourse';
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
import Loading from './components/Loading/Loading';

type FieldType = {
  username?: string;
  password?: string;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(
    !!localStorage.getItem('accessToken') && null
  );
  const [user, setUser] = useState<User>();

  if (authenticated == null) {
    const accessToken = localStorage.getItem('accessToken');
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((res) => {
        setUser({ firstName: res.firstName, lastName: res.lastName });
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }

  const onFinish: FormProps<FieldType>['onFinish'] = ({
    username,
    password,
  }) => {
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      })
      .then((res) => {
        setUser({ firstName: res.firstName, lastName: res.lastName });
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
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
                    authenticated ? (
                      <Navigate replace to="/courses" />
                    ) : authenticated === false ? (
                      <LoginForm
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                      />
                    ) : (
                      <Loading />
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
