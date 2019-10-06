import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import BBlogo from '../assets/logo/BudgetBase-Logo-dark.png';
import Phrase from '../assets/img/Phrase-signUp.png';

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
    };
  }

  componentWillReceiveProps({ error }) {
    this.setState({ error: error });
  }

  render() {
    return (
      <div className="row no-margin-bottom">
        <div className="col s5 slide-image" id="signUp-image">
          <img
            className="login-phrase"
            id="signUp-phrase"
            src={Phrase}
            alt="Slide Left"
          />
        </div>
        <div className="col s7 slide-form" id="signUp">
          <img className="signIn-logo" src={BBlogo} alt="BudgetBase" />
          <h4 className="title" id="signUp-title">
            Create Your Free Account
          </h4>
          <p className="sub-title" id="signUp-subTitle">
            Already have an account?
            <span>
              <Link to="/signin"> Log in</Link>
            </span>
          </p>
          <form
            className="col s12"
            id="signUp-form"
            onSubmit={this.handleSubmit}
          >
            {this.renderError()}
            <button className="btn custom-btn btn-social-fb" type="submit">
              <i class="fab fa-facebook-square social-icon"></i>Log in with
              Facebook
            </button>
            <div className="input-field col s6">
              <label>Last Name:</label>
              <input
                name="lastName"
                type="text"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s6">
              <label>First Name:</label>
              <input
                name="firstName"
                type="text"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s12">
              <label>Email:</label>
              <input
                name="email"
                type="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s12">
              <label>Password:</label>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s12">
              <label>Confirm Password:</label>
              <input
                name="cpassword"
                type="password"
                onChange={this.handleChange}
                onBlur={this.validatePasswords}
                required
              />
            </div>
            <div className="input-field col s12">
              {/* <label>Date of Birth:</label> */}
              <input
                name="dateOfBirth"
                type="date"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s12">
              <label>Initial Budget:</label>
              <input
                name="balance"
                type="number"
                min="0"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-field col s12 submit">
              <button className="btn custom-btn btn-login" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------------
  // Form Handlers and Render Helpers
  // -----------------------------------------------------------------------------
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.validatePasswords());
    if (this.validatePasswords()) this.props.signup(this.state);
  };

  validatePasswords = () => {
    if (this.state.password !== this.state.cpassword) {
      document
        .querySelector('input[name="cpassword"]')
        .setCustomValidity('Bad!');
      return false;
    }
    document.querySelector('input[name="cpassword"]').setCustomValidity('');
    return true;
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <div className="card-panel red lighten-1 white-text alert">
          {this.state.error}
        </div>
      );
    }
  };
}

export default Signup;
