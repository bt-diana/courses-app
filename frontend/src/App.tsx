import './App.css';
import UserProvider from './components/UserProvider/UserProvider';
import Layout from './components/Layout/Layout';
import Router from './components/Router/Router';

const App = () => {
  return (
    <UserProvider>
      <Layout>
        <Router />
      </Layout>
    </UserProvider>
  );
};

export default App;
