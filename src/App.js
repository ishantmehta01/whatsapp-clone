import React from 'react';
import Sidebar from './Sidebar.js'
import Chat from './Chat.js'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
