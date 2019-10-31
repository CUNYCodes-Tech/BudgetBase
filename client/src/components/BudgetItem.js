import React from 'react';

import CreateBudgetForm from './forms/CreateBudgetForm';

class BudgetItem extends React.Component {
  // state = { clicked: false }

  render() {
    const {name, amount, id} = this.props;
    
    const bg = this.props.idx % 2? "teal-bg" : "light-blue-bg";
    const btnbg = this.props.idx % 2? "light-blue-bg" : "teal-bg"
    return (
      <div className="budget-item-container col s4">
        <div>
          {name ? (
            <div id={`budget${id}`} className={`budget-item ${bg}`} onClick={() => this.handleFilter(id)}>
              <div className="budget-title">{name}</div>
              <div className="budget-amount">${amount}</div>
              <div className="progress-bar"></div>
            </div> ) : (
            <div className={`budget-item ${bg}`}>
              <div className={`${btnbg} add-btn btn-floating btn-large waves-light`}>
                <i className="material-icons" onClick={this.handleAddBudget}>add</i>
              </div>
            </div> 
          )}
        </div>
      </div>
    )
  }

  handleFilter = id => {
    if (this.props.clicked && this.props.activeId === id) {
      this.props.setClicked(false);
      this.props.setActiveId(null);
      this.props.fetchTransactions();
      document.querySelector(`#budget${id}`).setAttribute("style", "border: none");
    } else {
      this.props.setClicked(true);
      this.props.setActiveId(id);
      this.props.filterTransactions(id);
      document.querySelectorAll('[id^="budget"]').forEach(e => e.setAttribute("style", "border: none"));
      document.querySelector(`#budget${id}`).setAttribute("style", "box-shadow: 0 0 20px rgba(81, 203, 238, 1)");
    }
  }

  handleAddBudget = () => {
    this.props.setModalTitle('Create a New Budget');
    this.props.setModalContent(
      <CreateBudgetForm
        fetchTransactions={this.props.fetchTransactions}
        toggleModal={this.props.toggleModal}
        fetchUser={this.fetchUser}
        fetchBalance={this.props.fetchBalance}
        fetchBudgets={this.props.fetchBudgets}
      />
    );
    this.props.toggleModal();
  }
}

export default BudgetItem;