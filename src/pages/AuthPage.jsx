import React, {useState} from 'react';
import AuthForm from '../components/AuthForm';

function AuthPage({setToken}) {
  const [opened, setOpened] = useState(true);

  return (
    <>
      <button onClick={() => setOpened(!opened)}>Close</button>
      <p>{'Username: test_super\n' +
      'Password: Nf<U4f<rDbtDxAPn'}</p>
      {opened && <AuthForm setToken={setToken}/>}
    </>
  );
}

export default AuthPage;