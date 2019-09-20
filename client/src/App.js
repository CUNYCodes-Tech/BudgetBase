import React from 'react';
import { BrowserRouter as Router, Route, Link, R } from 'react-router-dom';
import { Redirect } from 'react-router';

import Navigation from './components/Navigation';
import Signup     from './components/Signup';
import Signin     from './components/Signin';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route path="/" render={ () => <Redirect to="/signup" /> } />
          <Route path="/signup" component={ Signup } />
          <Route path="/signin" component={ Signin } />
        </div>
      </Router>
    );
  }
}

export default App;