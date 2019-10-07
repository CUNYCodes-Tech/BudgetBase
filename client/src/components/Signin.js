import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import BBlogo from '../assets/logo/BudgetBase-Logo-dark.png';
import SlidePhrase from '../assets/img/Phrase.png';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: null };
  }

  static componentWillReceiveProps({ error }) {
    this.setState({ error: error });
  }

  render() {
    return (
      <div className="row no-margin-bottom">
        <div className="col s12 m12 l5 slide-form">
          <img className="signIn-logo" src={BBlogo} alt="BudgetBase" />
          <h4 className="title">Log In Into Your Account</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderError()}
            <div className="input-field col s12">
              <label>Email</label>
              <input
                name="email"
                type="email"
                onChange={this.handleChange}
                required
              />
              <i class="material-icons form-ico">mail_outline</i>
            </div>
            <div className="input-field col s12">
              <label>Password</label>
              <br />
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                required
              />
              <i className="material-icons form-ico">lock_outline</i>
              <Link to="/forgot-password" className="link-forgot right">
                Forgot password?
              </Link>
            </div>
            <div className="input-field col s12 submit">
              <button className="btn custom-btn btn-login" type="submit">
                Log In
              </button>
              <button className="btn custom-btn btn-social-fb" type="submit">
                <i class="fab fa-facebook-square social-icon"></i>Log in with
                Facebook
              </button>
            </div>
          </form>
        </div>
        <div
          className="col l7 hide-on-med-and-down slide-image"
          id="signIn-image"
        >
          <img className="login-phrase" src={SlidePhrase} alt="phrase" />
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
    this.props.signin(this.state);
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

export default Signin;
