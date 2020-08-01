import React from 'react';

import AuthForm from '../components/AuthForm';
import Redirect from '../components/Redirect';

function AuthPage({ token, setToken }) {
  return (
    <div className='auth'>
      {token ? (
        <Redirect message='You are already authorized' link='users' button='Users List' />
      ) : (
        <AuthForm setToken={setToken} />
      )}
    </div>
  );
}

export default AuthPage;
