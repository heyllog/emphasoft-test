import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';

function AuthPage({ token, setToken }) {
  return token ? (
    <>
      <span>You are already authorized</span>
      <span>
        <Link to='users'>Users List</Link>
      </span>
    </>
  ) : (
    <AuthForm setToken={setToken} />
  );
}

export default AuthPage;
