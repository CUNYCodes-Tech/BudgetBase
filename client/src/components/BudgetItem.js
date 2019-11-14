import React from 'react';

import CreateBudgetForm from './forms/CreateBudgetForm';
import DeleteBudgetForm from './forms/DeleteBudgetForm';

class BudgetItem extends React.Component {
  componentWillReceiveProps({ name, amount, currentAmount, id }) {
    const percent = (amount - currentAmount) / amount * 100;
    if (name && document.querySelector(`.progress-${id}`)) document.querySelector(`.progress-${id}`).setAttribute('style', `width: ${percent}%; height: 100%; border-radius: inherit; background: #1de9b6;`);
  }

  componentDidMount() {
    const percent = (this.props.amount - this.props.currentAmount) / this.props.amount * 100;
    if (this.props.name) document.querySelector(`.progress-${this.props.id}`).setAttribute('style', `width: ${percent}%; height: 100%; border-radius: inherit; background: #1de9b6;`);
  }

  render() {
    const {name, amount, currentAmount, id} = this.props;
    const bg = this.props.idx % 2? "teal-bg" : "light-blue-bg";
    const btnbg = this.props.idx % 2? "light-blue-bg" : "teal-bg"
    return (
      <div className="col s12 m4">
        <div>
          {name ? (
            <div id={`budget${id}`} className={`budget-item ${bg}`} onClick={() => this.handleFilter(id)}>
              <div className="budget-title">{name}</div>
              <i class="fas fa-times-circle delete-budget" onClick={this.deleteBudget}></i>
              <div className="budget-amount">${currentAmount}</div>
              <div className="progress-bar">
                <div className={`progress-${id}`}></div>
              </div>
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

  deleteBudget = e => {
    e.stopPropagation();
    this.props.setModalTitle('Delete this budget?');
    this.props.setModalContent(
      <DeleteBudgetForm 
        toggleModal={this.props.toggleModal}
        fetchBudgets={this.props.fetchBudgets}
        id={this.props.id}
      />
    );
    this.props.toggleModal();
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