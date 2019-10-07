import React from 'react';
import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';

class Dashboard extends React.Component {
  state = { showModal: false }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        <h4 className="title">Dashboard</h4>
        <div className ="row" >
          <div className="col s12 m4">
            <SideMenu 
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
            />
          </div>
          <div className ="col s12 m8">
            <ActivityMenu 
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;