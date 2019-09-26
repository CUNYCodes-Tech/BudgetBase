import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import './App.css';
import history    from './history';
import Navigation from './components/Navigation';
import Signup     from './components/Signup';
import Signin     from './components/Signin';
import Dashboard  from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null, error: null }
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') });
  }

  signin = async (form) => {
    try {
      const response = await fetch('/api/signin', { 
        method: 'POST', 
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      this.setState({ token: json.token });
      localStorage.setItem('token', json.token);
      history.push('/dashboard')
    } catch (error) {
      this.setState({ error: 'Invalid'})
    }
  }

  signup = async form => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      this.setState({ token: json.token });
      localStorage.setItem('token', json.token);
      history.push('/dashboard');
    } catch (error) {
      this.setState({ error: 'Invalid' });
    }
  }

  signout = () => {
    this.setState({ token: '' });
    localStorage.removeItem('token');
    history.push('/signin');
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Navigation 
            token={this.state.token}
            signout={this.signout} 
          />
          <Route path="/" render={ () => <Redirect to="/signin" /> } exact />
          <Route 
            path="/signup"
            render={props => <Signup {...props} signup={this.signup} /> }
          />
          <Route 
            path="/signin"
            render={props => <Signin {...props} signin={this.signin} />} 
          />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;