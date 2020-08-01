import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Регулярные выражения для проверки логина и пароля, взяты из swagger, но изменены возможные длины строк
const usernameCheck = /^[\w.@+-]{1,150}$/;
const passwordCheck = /^(?=.*[A-Z])(?=.*\d).{8,128}$/;

function AuthForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        history.push('emphasoft-test/users');
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
      <form className='auth-form' onSubmit={handleSubmit}>
        <span className='login'>Account Login</span>
        {errors && <span className='error'>{errors}</span>}
        <label>
          Username
          <input
            value={username}
            type='text'
            placeholder='Username'
            onChange={usernameChangeHandler}
          />
        </label>
        <br />
        <label>
          Password
          <input
            value={password}
            type='password'
            placeholder='Password'
            onChange={passwordChangeHandler}
          />
        </label>
        <br />
        <button className='button' type='submit'>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
