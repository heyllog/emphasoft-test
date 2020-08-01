import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthPage({ token, setToken }) {
  return (
    <div className='auth'>
      {token ? (
        <div className='authorized'>
          <p>You are already authorized</p>
          <Link to='users'>
            <button className='button'>Users List</button>
          </Link>
        </div>
      ) : (
        <AuthForm setToken={setToken} />
      )}
    </div>
  );
}

export default AuthPage;
