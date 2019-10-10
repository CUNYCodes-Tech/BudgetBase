import React from 'react'
import TransactionItem from './TransactionItem';


const ActivityContainer = ({ fetchBudget, fetchTransactions, transactions, setModalTitle, setModalContent, toggleModal }) => {
  return (
    <div className="activity-container">
      {
        transactions.map(transaction => (
          <TransactionItem
            key = {transaction._id}
            transaction = {transaction} 
            setModalTitle = {setModalTitle}
            setModalContent = {setModalContent}
            toggleModal = {toggleModal}
            fetchBudget={fetchBudget}
            fetchTransactions={fetchTransactions}
          />
        ))
      }
    </div>
  );
}

export default ActivityContainer;