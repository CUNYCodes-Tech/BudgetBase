import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import SideNavLogo from '../assets/img/Dashboard-Logo.png'

class SideNav extends React.Component {
  componentDidMount() {
    this.setSideNav();
    window.addEventListener('resize', this.setSideNav);
  }

  setSideNav() {
    const parWidth = document.querySelector('.side-nav-container').offsetWidth;
    document.querySelector('.side-nav').setAttribute('style', `width:${parWidth}px!important`);
  }

  render() {
    return (
      <div className="side-nav">
        <div className="center">
          <img id="side-nav-logo" src={SideNavLogo} />
        </div>
        <div className="side-icon-container">
          <i className="side-icon fas fa-wallet" />
          <i className="side-icon far fa-file-alt" />
          <i className="side-icon fas fa-credit-card" />
          <i className="side-icon far fa-bookmark" />
        </div>
        <div>
          <div className="dropup-container">
            <i className="side-icon fas fa-cog" />
            <div className="dropup-content">
              <Link to="/signout">Log out</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;