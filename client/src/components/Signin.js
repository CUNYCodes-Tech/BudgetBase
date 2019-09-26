import React from 'react';

class Signin extends React.Component {
  render() {
    return (
      <div>
        <p>Sign In</p>
        <form>
          <label>Email</label><br/>
          <input
            name = 'email'
            type = 'text'
            placeholder = 'example@email.com'
          /><br/>
          <label>Password</label><br/>
          <input
            name = 'password'
            type = 'password'
          /><br/>
          <input
            value = 'Submit'
            type = 'submit'
          />
        </form>
      </div>
    );
  }
}

export default Signin;