import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

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
