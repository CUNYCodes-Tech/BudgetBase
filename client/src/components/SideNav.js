import React from 'react';

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
        <img id="side-nav-logo" src={SideNavLogo} />
        <div className="icon-container">
          <i className="side-icon fas fa-wallet" />
          <i className="side-icon far fa-file-alt" />
          <i className="side-icon fas fa-credit-card" />
          <i className="side-icon far fa-bookmark" />
        </div>
        <div className="side-nav-footer">
          <i className="side-icon fas fa-cog" />
        </div>
      </div>
    );
  }
}

export default SideNav;