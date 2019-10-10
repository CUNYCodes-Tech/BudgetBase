import React from 'react';

import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import Modal from './Modal';

class Dashboard extends React.Component {
  state = { budgetLeft: 0, transactions: [], showModal: false, modalContent: null, modalTitle: null, modalSubmit: null }

  componentDidMount() {
    this.fetchTransactions();
    this.fetchBudget();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  setModalContent = content => {
    this.setState({ modalContent: content });
  }

  setModalTitle = title => {
    this.setState({ modalTitle: title })
  }

  fetchTransactions = async () => {
    const response = await fetch('/api/transaction/all', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    this.setState({ transactions: data });
  }

  fetchBudget = async () => {
    const response = await fetch('/api/user/budget', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    const data = await response.json();
    this.setState({ budgetLeft: data });
  }

  render() {
    return (
      <div>
        <Modal title={this.state.modalTitle} 
          modalSubmit={this.state.modalSubmit} 
          showModal={this.state.showModal} 
          toggleModal={this.toggleModal}
        >
          {this.state.modalContent}
        </Modal>
        <h4 className="title">Dashboard</h4>
        <div className ="row" >
          <div className="col s12 m4">
            <SideMenu
              fetchBudget={this.fetchBudget}
              fetchTransactions={this.fetchTransactions}
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              setModalContent={this.setModalContent}
              setModalTitle={this.setModalTitle}
            />
          </div>
          <div className ="col s12 m8">
            <ActivityMenu
              fetchBudget={this.fetchBudget}
              fetchTransactions={this.fetchTransactions}
              budgetLeft={this.state.budgetLeft}
              transactions={this.state.transactions}
              token={this.props.token}
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