import React from 'react'
import TransactionItem from './TransactionItem';


const ActivityContainer = ({ transactions, setModalTitle, setModalContent, toggleModal }) => {
  return (
    <div className="activity-container">
      {
        transactions.map(transaction => (
          <TransactionItem 
          transaction = {transaction} 
          setModalTitle = {setModalTitle}
          setModalContent = {setModalContent}
          toggleModal = {toggleModal}/>
        ))
      }
    </div>
  );
}

export default ActivityContainer;