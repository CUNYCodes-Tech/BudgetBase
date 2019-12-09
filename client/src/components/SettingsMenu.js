import React from 'react';

import history from '../history';

class SettingsMenu extends React.Component {
  state = { active: "User Profile" };

  render() {
    return (
      <div style={{ textAlign: "center", borderRight: "0.5px solid #a8a8a8", height: "100%", paddingTop: "2rem" }}>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#707070" }}>Settings</div>
        <div style={{ marginTop: "5rem", textAlign: "left", paddingLeft: "5rem", fontSize: "1.3rem" }}>
          <div className={`setting-category ${this.props.active === "User Profile"? "setting-selected" : null }`} onClick={() => this.props.handleSelect("User Profile")}>User Profile</div>
          <div className={`setting-category ${this.props.active === "Delete Account"? "setting-selected" : null }`} onClick={ () => this.props.handleSelect("Delete Account")} >Delete Account</div>
          <div className="setting-category" onClick={ () => history.push('/signout') }>Log Out</div>
        </div>
      </div>
    );
  }
}

export default SettingsMenu;