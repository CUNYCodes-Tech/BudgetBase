import React from 'react';

import "../Settings.css";
import SideNav from './SideNav';
import SettingsMenu from './SettingsMenu';
import ProfileSettings from './ProfileSettings';
import DeleteSettings from './DeleteSettings';

class Setting extends React.Component {
  state = { active: "User Profile" };

  render() {
    return (
        <>
          <div className="row" style={{ height: "100vh", background: "#ffffff" }}>
            <div className="col s12 m1 side-nav-container hide-on-med-and-down">
              <SideNav />
            </div>
            <div className="col s12 m3" style={{ height: "100%" }}>
              <SettingsMenu handleSelect={this.handleSelect} active={this.state.active} />
            </div>
            <div className="col s12 m8">
              {this.handleRender()}
            </div>
          </div>
        </>
    );
  }

  handleSelect = selection => {
    this.setState({ active: selection });
  }

  handleRender = () => {
    switch(this.state.active) {
      case "User Profile":
        return <ProfileSettings />
      case "Delete Account":
        return <DeleteSettings />
      default:
        return null
    }
  }
}

export default Setting;