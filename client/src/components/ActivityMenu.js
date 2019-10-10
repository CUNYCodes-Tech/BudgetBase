import React from 'react';

import ActivityContainer from './ActivityContainer';
import TransactionForm from './forms/TransactionForm';

class ActivityMenu extends React.Component {
  handleModal = () => {
    this.props.setModalTitle('New Transaction');
    this.props.setModalContent(<TransactionForm toggleModal={this.props.toggleModal} fetchTransactions={this.props.fetchTransactions} fetchBudget={this.props.fetchBudget} />);
    this.props.toggleModal();
  }

  render() {
    return (
      <div className="center">
        <h5>Budgets Left: ${this.props.budgetLeft}</h5>
        <button onClick={this.handleModal} id="newTransaction" className="btn" >
          New Transaction
        </button>
        <ActivityContainer
          fetchBudget={this.props.fetchBudget}
          fetchTransactions={this.props.fetchTransactions}
          transactions={this.props.transactions} 
          setModalTitle = {this.props.setModalTitle} 
          setModalContent = {this.props.setModalContent} 
          toggleModal = {this.props.toggleModal}
        />
      </div>
    );
  }
}

export default ActivityMenu;