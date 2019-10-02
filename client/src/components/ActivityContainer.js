import React from 'react'
import TransactionItem from './TransactionItem';


const TransactionItemsList = ({transactions}) =>   {
   
    return (
        <div >
            {transactions.map(transaction => (
                <TransactionItem transaction = {transaction} />
            ))}
        </div>
    );
    
}

export default TransactionItemsList