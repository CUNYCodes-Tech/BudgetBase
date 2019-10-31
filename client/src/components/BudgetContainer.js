import React from 'react';
import BudgetItem from './BudgetItem';

class BudgetContainer extends React.Component {
  state={ clicked: false, activeId: null, transactions: [] };

  componentWillReceiveProps({ transactions }) {
    this.setState({ transactions })
  }

  render() {
    return (
      <div className="row">
        {
          this.props.budgets.map((budget, idx) => {
            return (
              <BudgetItem 
                idx={idx}
                clicked={this.state.clicked}
                activeId={this.state.activeId}
                setClicked={this.setClicked}
                setActiveId={this.setActiveId}
                id={budget._id}
                name={budget.name} 
                amount={budget.amount}
                transactions={this.state.transactions}
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

  setClicked = val => {
    this.setState({ clicked: val });
  }

  setActiveId = val => {
    this.setState({ activeId: val });
  }
}

export default BudgetContainer;