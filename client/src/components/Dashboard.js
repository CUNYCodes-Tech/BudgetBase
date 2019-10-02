import React from 'react';
import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import StatsMenu from './StatsMenu';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title">Dashboard</h4>
        <div className ="row" >
          <div className="col s12 m4"  >
            <SideMenu />
          </div>
          <div className ="col s12 m4">
            <ActivityMenu />
          </div>
          <div className="col s12 m4">
            <StatsMenu />
          </div>
        </div>
      </div>

    );
  }
}

export default Dashboard;