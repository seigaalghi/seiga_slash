import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import { Fragment } from 'react';
import NavBar from './components/NavBar';
import React, { useEffect } from 'react';
import './App.css';

function App() {
  return (
      <Router>
        <Fragment>
          <NavBar />
          <section className='container'>
            <Switch>
              <Route path='/register' exact component={Register} />
              <Route path='/' exact component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
  );
}

export default App;
