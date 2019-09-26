import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      cpassword: '',
      dateOfBirth: '',
      balance: 0,
      error: null
    }
  }

  componentWillReceiveProps({ error }) {
    this.setState({ error: error });
  }

  render() {
    return (
      <div className="row">
        <h4 class="title">Sign Up</h4>
        <form className="col s12" onSubmit={this.handleSubmit}>
          {this.renderError()}
          <div className="input-field col s6">
            <label>Last Name:</label>
            <input 
              name="lastName"
              type="text"
              onChange = {this.handleChange} 
              required
            />
          </div>
          <div className="input-field col s6">
            <label>First Name:</label>
            <input 
              name="firstName" 
              type="text" 
              onChange = {this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12">
            <label>Email:</label>
            <input 
              name="email" 
              type="email" 
              onChange = {this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12">
            <label>Password:</label>
            <input 
              name="password" 
              type="password" 
              onChange = {this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12">
            <label>Confirm Password:</label>
            <input 
              name="cpassword" 
              type="password" 
              onChange = {this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12">
            {/* <label>Date of Birth:</label> */}
            <input 
              name="dateOfBirth" 
              type="date" 
              onChange = {this.handleChange}
              required
            />
          </div>
          <div className="input-field col s12">
            <label>Initial Budget:</label>
            <input 
              name="balance" 
              type="number" 
              min="0"
              onChange = {this.handleChange} 
              required
            />
          </div>
          <div className="input-field col s12 submit">
            <input class="btn" type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }

  // -----------------------------------------------------------------------------
  // Form Handlers and Render Helpers
  // -----------------------------------------------------------------------------
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.validatePasswords()) this.props.signup(this.state);
  }

  validatePasswords = () => {
    if (this.state.password !== this.state.cpassword) {
      document.querySelector('input[name="cpassword"]').setCustomValidity('Bad!');
      return false;
    }

    return true;
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <div className="card-panel red lighten-1 white-text alert">
            {this.state.error}
        </div>
      );
    }
  }
}

export default Signup;