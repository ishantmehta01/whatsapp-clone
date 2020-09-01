import React from 'react';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Login from './Login'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import './App.css';

function App() {
  const [{ user }] = useStateValue()
  return (
    <div className="app">
      {user ? (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId">
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/">
                <Sidebar />
              </Route>
            </Switch>
          </Router>
        </div>
      ) : <Login />}
    </div>
  );
}

export default App;
