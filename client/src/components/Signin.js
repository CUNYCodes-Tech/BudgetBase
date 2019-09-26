import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.signin(this.state);
  }

  render() {
    return (
      <div className="row">
        <h4 className="title">Sign In</h4>
        <form className="col s12" onSubmit={this.handleSubmit}>
        <div className="input-field col s12">
          <label>Email</label><br/>
          <input name = 'email' type = 'text' onChange = {this.handleChange} />
        </div>
        <div className="input-field col s12">
          <label>Password</label><br/>
          <input name = 'password' type = 'password' onChange = {this.handleChange} />
        </div>
        <div className="input-field col s12 submit">
          <input className="btn" value = 'Submit' type = 'submit' />
        </div>
        </form>
      </div>
    );
  }
}

export default Signin;