import React from 'react';
import { Link } from 'react-router-dom';

import history from '../history';

// Assets
import SideNavLogo from '../assets/img/Dashboard-Logo.png'

class SideNav extends React.Component {
  render() {
    return (
      <div className="side-nav">
        <div className="center">
          <img id="side-nav-logo" src={SideNavLogo} />
        </div>
        <div className="side-icon-container">
          <i className="side-icon fas fa-wallet" onClick={() => history.push('/dashboard')} style={this.isActive("/dashboard")} />
          <i className="side-icon far fa-file-alt" onClick={() => history.push('/report')} style={this.isActive("/report")} />
          {/* <i className="side-icon far fa-bookmark" onClick={() => history.push('/archive')} style={this.isActive("/archive")} /> */}
        </div>
        <div>
          <i className="side-icon fas fa-cog" onClick={() => history.push('/setting')} style={this.isActive("/setting")} />
          {/* <i class="fas fa-sign-out-alt side-icon" onClick={() => history.push('/signout')} /> */}
        </div>
      </div>
    );
  }

  isActive = pathname => {
    return pathname === window.location.pathname? { background: "#1976d2" } : {};
  }
}

export default SideNav;