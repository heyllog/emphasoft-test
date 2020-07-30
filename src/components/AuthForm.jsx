import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

// Регулярные выражения для проверки логина и пароля, взяты из swagger, но изменены возможные длины строк
const usernameCheck = /^[\w.@+-]{1,150}$/;
const passwordCheck = /^(?=.*[A-Z])(?=.*\d).{8,128}$/;

function AuthForm({setToken}) {
  const [username, setUsername] = useState("test_super");
  const [password, setPassword] = useState("Nf<U4f<rDbtDxAPn");
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!usernameCheck.test(username) || !passwordCheck.test(password)) {
      setErrors('Incorrect username or password.');
      setLoading(false);
      return
    }

    const response = await fetch('https://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        signal: controller.signal,
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );

    if (response.ok) {
      let json = await response.json();
      setToken(json.token);
      // TODO return <Redirect to='users'/>
      history.push('users')
    } else {
      setErrors('Incorrect username or password.');
    }
    setLoading(false);
  };

  // TODO для отмены текущего запроса при ререндере
  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, []);

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        {errors && <span className="error">{errors}</span>}
        <input value='test_super' type="text" placeholder="Username"
               onChange={event => setUsername(event.target.value)}/><br/>
        <input value='Nf<U4f<rDbtDxAPn' type="password" placeholder="Password"
               onChange={event => setPassword(event.target.value)}/><br/>
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </>
  );
}

export default AuthForm;