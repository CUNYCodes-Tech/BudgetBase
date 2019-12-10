import React from 'react';

class ProfileSettings extends React.Component {
  state = { user: {}, photo: null, message: null };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div style={{ padding: "5rem 10rem" }}>
        <div className="row">
          { this.state.message? <div>{this.state.message}</div> : null }
          <div className="col s3">
            <span style={{ position: "relative" }}>  
              <input onChange={this.handleUploaderChange} className="avatar-uploader" type="file" name="photo" style={{ display: "none" }} />
              <img onClick={() => document.querySelector(".avatar-uploader").click() } src={this.state.user.avatar} style={{ width: "7em", height: "7em", borderRadius: "7em", cursor: "pointer" }} />
              <a class="btn-floating btn-small red" onClick={() => document.querySelector(".avatar-uploader").click() }>
                <i class="large material-icons">mode_edit</i>
              </a>
            </span>
          </div>
          <div className="col s9">
            <div className="setting-fullname">{this.state.user.firstName} {this.state.user.lastName}</div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input id="firstName" placeholder="." onChange={this.handleChange} name="firstName" type="text" value={this.state.user.firstName} />
            <label for="firstName">First Name</label>
          </div>
          <div className="input-field col s12 m6">
            <input id="lastName" placeholder="." onChange={this.handleChange} name="lastName" type="text" value={this.state.user.lastName} />
            <label for="lastName">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <input id="email" placeholder="." onChange={this.handleChange} name="email" type="text" value={this.state.user.email} />
            <label for="email">Email</label>
          </div>
          <div className="input-field col s12 m6">
            <input id="balance" placeholder="." onChange={this.handleChange} name="balance" type="text" value={this.state.user.balance} />
            <label for="balance">Balance</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12">
            <input className="save-btn btn" type="submit" value="SAVE" onClick={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }

  fetchUser = async () => {
    const response = await fetch('/api/user/', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    this.setState({
      user: data
    });
  };

  handleSubmit = async () => {
    const formData = new FormData();

    if (this.state.photo) formData.append('photo', this.state.photo);
    formData.append('lastName', this.state.user.lastName);
    formData.append('firstName', this.state.user.firstName);
    formData.append('email', this.state.user.email);
    formData.append('balance', this.state.user.balance);

    try {
      await fetch('/api/user/update', {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      this.setState({ message: "Successfully Saved!" });
      this.fetchUser();
    } catch(e) {
      this.setState({ message: "Something went wrong :(" })
    }

  }

  handleUploaderChange = () => {
    const photo = document.querySelector('.avatar-uploader');

    this.setState({ photo: photo.files[0] });
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value }
    }));
  }

  
}

export default ProfileSettings;