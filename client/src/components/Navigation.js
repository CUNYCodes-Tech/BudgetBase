import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null, user: null }
  }

  componentWillReceiveProps({ token, user }) {
    this.setState({ token: token });
    this.fetchUser(token);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Budgetbase</a>
          <ul className="right hide-on-med-and-down">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }

  // -----------------------------------------------------------------------------
  // Helper Methods
  // -----------------------------------------------------------------------------
  renderLinks = () => {
    if (this.state.token) {
      return (
        <React.Fragment>
          <li>
            <Link to="/dashboard">{this.state.user}</Link>
          </li>
          <li>
            <Link to="/signin" onClick={this.props.signout}>Sign Out</Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </React.Fragment>
    );
  }

  fetchUser = async token => {
    const response = await fetch('/api/user', {
      headers: {
        'Authorization': token
      }
    });
    const json = await response.json();
    this.setState({ user: json.user });
  }
}

export default Navigation;