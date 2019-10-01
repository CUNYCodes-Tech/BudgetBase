import React from 'react';
import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import StatsMenu from './StatsMenu';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title">Dashboard</h4>
        <div class="row">
          <div class="col s12 m4">
            <SideMenu />
          </div>
          <div class="col s12 m4">
            <ActivityMenu />
          </div>
          <div class="col s12 m4">
            <StatsMenu />
          </div>
        </div>
      </div>

    );
  }
}

export default Dashboard;