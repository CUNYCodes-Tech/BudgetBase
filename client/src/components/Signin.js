import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: null }
  }

  componentWillReceiveProps({ error }) {
    this.setState({ error: error });
  }
  
  render() {
    return (
      <div className="row">
        <h4 className="title">Sign In</h4>
        <form className="col s12" onSubmit={this.handleSubmit}>
        {this.renderError()}
        <div className="input-field col s12">
          <label>Email</label>
          <input name='email' type='email' onChange={this.handleChange} required/>
        </div>
        <div className="input-field col s12">
          <label>Password</label><br/>
          <input name='password' type='password' onChange={this.handleChange} required/>
        </div>
        <div className="input-field col s12 submit">
          <input className="btn" value='Submit' type='submit' />
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
    this.props.signin(this.state);
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

export default Signin;