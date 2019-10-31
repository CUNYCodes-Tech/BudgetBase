import React from 'react';

import SideNav from './SideNav';
import SideMenu from './SideMenu';
import ActivityMenu from './ActivityMenu';
import Modal from './Modal';
import BudgetContainer from './BudgetContainer';

class Dashboard extends React.Component {
  state = { balance: 0, transactions: [], budgets: [], totalBudgets: 0, showModal: false, modalContent: null, modalTitle: null, modalSubmit: null }

  componentDidMount() {
    this.fetchTransactions();
    this.fetchBalance();
    this.fetchBudgets();
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

  fetchBalance = async () => {
    const response = await fetch('/api/user/balance', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    const data = await response.json();
    this.setState({ balance: data });
  }

  fetchBudgets = async () => {
    const response = await fetch('/api/budget/', {
      headers: { Authorization: localStorage.getItem('token') }
    });
    let data = await response.json();
    let totalBudgets = 0;
    for (let budget of data) {
      totalBudgets += budget.amount;
    }
    while (data.length < 3) data.push({});
    
    this.setState({ budgets: data, totalBudgets: totalBudgets });
  }

  filterTransactions = async (budgetId) => {
    const response = await fetch(`/api/transactions/filter/${budgetId}`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const data = await response.json();
    this.setState({ transactions: data });
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
        <div className ="row">
          <div className="col s12 m1 side-nav-container">
            <SideNav />
          </div>
          <div className="col s12 m3 side-menu-container">
            <SideMenu
              balance={this.state.balance}
              budgets={this.state.budgets}
              transactions={this.state.transactions}
              fetchBalance={this.fetchBalance}
              fetchBudgets={this.fetchBudgets}
              fetchTransactions={this.fetchTransactions}
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
              setModalContent={this.setModalContent}
              setModalTitle={this.setModalTitle}
            />
          </div>
          <div className ="col s12 m8 activity-column">
            <div className="row">
              <div className="col s12 dashboard-header">
                <span className="dashboard-title">Dashboard</span>
                <span className="budget-total">
                  <span className="budget-total-title">Budget Total</span>
                  <span className="budget-num">${this.state.totalBudgets}</span>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="budget-total">Budgets</div>
                <BudgetContainer 
                  transactions={this.state.transactions}
                  toggleModal={this.toggleModal}
                  setModalContent={this.setModalContent}
                  setModalTitle={this.setModalTitle}
                  budgets={this.state.budgets}
                  fetchBalance={this.fetchBalance}
                  fetchBudgets={this.fetchBudgets}
                  fetchTransactions={this.fetchTransactions}
                  filterTransactions={this.filterTransactions}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s8">
                <div className="dashboard-subtitle">Your History</div>
                <ActivityMenu
                  fetchBalance={this.fetchBalance}
                  fetchTransactions={this.fetchTransactions}
                  balance={this.state.balance}
                  transactions={this.state.transactions}
                  token={this.props.token}
                  showModal={this.state.showModal}
                  toggleModal={this.toggleModal}
                  setModalContent={this.setModalContent}
                  setModalTitle={this.setModalTitle}
                />
              </div>
              <div className="col s4">
                <div className="dashboard-subtitle">Overview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;