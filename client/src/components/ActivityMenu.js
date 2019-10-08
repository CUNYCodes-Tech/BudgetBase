import React from 'react';

import ActivityContainer from './ActivityContainer';
import TransactionForm from './forms/TransactionForm';

class ActivityMenu extends React.Component {
  state = { transactions: [], budgetLeft: 0 };

  componentDidMount() {
    this.fetchTransactions();
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

  handleModal = () => {
    this.props.setModalTitle('New Transaction');
    this.props.setModalContent(<TransactionForm toggleModal={this.props.toggleModal} fetchTransactions={this.fetchTransactions} />);
    this.props.toggleModal();
  }

  render() {
    const {transactions , budgetLeft} = this.state;
    
    return (
      <div className="center">
        <h5>Budgets Left: $0.00</h5>
        <button onClick={this.handleModal} id="newTransaction" className="btn" >
          New Transaction
        </button>
        <ActivityContainer transactions={this.state.transactions} />
      </div>
    );
  }
}

export default ActivityMenu;