import React from 'react'
import TransactionItem from './TransactionItem';


const ActivityContainer = ({ fetchBudgets, fetchBalance, fetchTransactions, transactions, setModalTitle, setModalContent, toggleModal }) => {
  return (
    <div className="row activity-container">
        {
          transactions.map(transaction => (
            <TransactionItem
              key = {transaction._id}
              transaction = {transaction} 
              setModalTitle = {setModalTitle}
              setModalContent = {setModalContent}
              toggleModal = {toggleModal}
              fetchBalance={fetchBalance}
              fetchBudgets={fetchBudgets}
              fetchTransactions={fetchTransactions}
            />
          ))
        }
    </div>
  );
}

export default ActivityContainer;