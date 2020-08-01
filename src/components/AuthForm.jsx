import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Регулярные выражения для проверки логина и пароля, взяты из swagger, но изменены возможные длины строк
const usernameCheck = /^[\w.@+-]{1,150}$/;
const passwordCheck = /^(?=.*[A-Z])(?=.*\d).{8,128}$/;

function AuthForm({ setToken }) {
  const [username, setUsername] = useState('test_super');
  const [password, setPassword] = useState('Nf<U4f<rDbtDxAPn');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const controller = new AbortController();

  const usernameChangeHandler = (event) => setUsername(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!usernameCheck.test(username) || !passwordCheck.test(password)) {
      setErrors('Incorrect username or password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'https://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          signal: controller.signal,
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        let json = await response.json();
        setToken(json.token);
        history.push('users');
      }
    } catch {
      if (!controller.signal.aborted) {
        setErrors('Incorrect username or password.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        {errors && <span className='error'>{errors}</span>}
        <input
          value='test_super'
          type='text'
          placeholder='Username'
          onChange={usernameChangeHandler}
        />
        <br />
        <input
          value='Nf<U4f<rDbtDxAPn'
          type='password'
          placeholder='Password'
          onChange={passwordChangeHandler}
        />
        <br />
        <button type='submit'>{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </>
  );
}

export default AuthForm;
