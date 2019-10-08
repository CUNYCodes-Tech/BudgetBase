import React from 'react';

import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import Modal from './Modal';

class Dashboard extends React.Component {
  state = { showModal: false, modalContent: null, modalTitle: null }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  setModalContent = content => {
    this.setState({ modalContent: content });
  }

  setModalTitle = title => {
    this.setState({ modalTitle: title })
  }

  render() {
    return (
      <div>
        <Modal title={this.state.modalTitle} showModal={this.state.showModal} toggleModal={this.toggleModal}>
          {this.state.modalContent}
        </Modal>
        <h4 className="title">Dashboard</h4>
        <div className ="row" >
          <div className="col s12 m4">
            <SideMenu 
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              setModalContent={this.setModalContent}
              setModalTitle={this.setModalTitle}
            />
          </div>
          <div className ="col s12 m8">
            <ActivityMenu 
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              setModalContent={this.setModalContent}
              setModalTitle={this.setModalTitle}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;