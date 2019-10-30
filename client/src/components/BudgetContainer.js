import React from 'react';
import BudgetItem from './BudgetItem';

class BudgetContainer extends React.Component {
  state = {
    budgets:
    [
      {name : "Car of My Dream", amount : 300},
      {name : "Meow", amount : 500},
      {}
    ]
  };

  render() {
    return (
      <div className="row">
        {
          this.props.budgets.map((budget, idx) => {
            return (
              <BudgetItem 
                idx={idx}
                id={budget._id}
                name={budget.name} 
                amount={budget.amount} 
                fetchBalance={this.props.fetchBalance} 
                fetchTransactions={this.props.fetchTransactions}
                fetchBudgets={this.props.fetchBudgets}
                filterTransactions={this.props.filterTransactions}
                toggleModal={this.props.toggleModal} 
                setModalContent={this.props.setModalContent} 
                setModalTitle={this.props.setModalTitle}  
              />
            )
          })
        }
      </div>
    );
  }
}

export default BudgetContainer;