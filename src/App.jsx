import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import UsersPage from './pages/UsersPage';

function App() {
  const [token, setToken] = useState();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Authorization</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/users'>
            <UsersPage token={token} />
          </Route>
          <Route path='/'>
            <AuthPage token={token} setToken={setToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
