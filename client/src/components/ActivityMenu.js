import React from 'react';

import ActivityContainer from './ActivityContainer';
import TransactionForm from './forms/TransactionForm';

class ActivityMenu extends React.Component {
  render() {
    return (
      <ActivityContainer
        fetchBudgets={this.props.fetchBudgets}
        fetchBalance={this.props.fetchBalance}
        fetchTransactions={this.props.fetchTransactions}
        transactions={this.props.transactions} 
        setModalTitle = {this.props.setModalTitle} 
        setModalContent = {this.props.setModalContent} 
        toggleModal = {this.props.toggleModal}
      />
    );
  }
}

export default ActivityMenu;