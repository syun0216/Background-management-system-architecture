import React, { Component } from 'react';
import './App.css';
import Routes from './route/index'
import {BrowserRouter, Router} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
// import Login from './views/login/index'
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Router history={history}>
            <Routes />
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
