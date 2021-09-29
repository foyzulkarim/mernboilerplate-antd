import React from 'react';
import { Layout, Button, Space } from "antd";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import { MainLayout, AuthLayout } from './Layout/MainLayout';
import { useAuth } from './contexts/AuthContext';

const { Header, Footer } = Layout;

function App() {
  const [auth, handleAuth] = useAuth();
  return (
    <Layout>
      <Header>
        <Space>
          <div className="logo" ><h1 className='header'>RBAC MERN Boilerplate</h1></div>
          {auth.isAuthenticated && auth.profile && <h2 className='header'>{auth.profile.name}</h2>}
          {auth.isAuthenticated && <Button onClick={() => { handleAuth(false) }}>Log out</Button>}
        </Space>
      </Header>
      <Router>
        <Switch>
          {auth.isAuthenticated ? <MainLayout /> : <AuthLayout />}
        </Switch>
      </Router>
      <Footer />
    </Layout>
  );
}

export default App;
