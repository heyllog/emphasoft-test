import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import UsersPage from './pages/UsersPage';
import NotFound from './pages/NotFound';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <AuthPage token={token} setToken={setToken} />
        </Route>
        <Route path='/users'>
          <UsersPage token={token} />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
