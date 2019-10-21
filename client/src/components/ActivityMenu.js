import React from 'react';

import ActivityContainer from './ActivityContainer';
import TransactionForm from './forms/TransactionForm';

class ActivityMenu extends React.Component {
  handleModal = () => {
    this.props.setModalTitle('New Transaction');
    let budgetNameList = ["Book1", "Book2", "Book3", "Book4"];
    let categoriesList = ["", "Eating out", "Fuel", "Clothes", "Entertainment", "General", "Gifts", "Holidays", "Kids", "Shopping", "Sports", "Travel"];
    this.props.setModalContent(
    <TransactionForm 
      toggleModal={this.props.toggleModal} 
      fetchTransactions={this.props.fetchTransactions} 
      fetchBalance={this.props.fetchBalance} 
      budgetNameList = {budgetNameList}
      categoriesList = {categoriesList}/>);
    this.props.toggleModal();
  }

  render() {
    return (
      <div className="center">
        <h5>Budgets Left: ${this.props.balance}</h5>
        <button onClick={this.handleModal} id="newTransaction" className="btn" >
          New Transaction
        </button>
        <ActivityContainer
          fetchBalance={this.props.fetchBalance}
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