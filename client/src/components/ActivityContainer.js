import React from 'react'
import TransactionItem from './TransactionItem';


const ActivityContainer = ({ transactions }) => {
  return (
    <div className="activity-container">
      {
        transactions.map(transaction => (
          <TransactionItem transaction = {transaction} />
        ))
      }
    </div>
  );
}

export default ActivityContainer;