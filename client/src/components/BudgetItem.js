import React from 'react';

class BudgetItem extends React.Component {
  render() {
    const bg = this.props.idx % 2? "teal-bg" : "light-blue-bg";
    const btnbg = this.props.idx % 2? "light-blue-bg" : "teal-bg"
    return (
      <div className="budget-item-container col s4">
        <div className={`budget-item ${bg}`}>
          <div class={`${btnbg} add-btn btn-floating btn-large waves-light`}>
            <i class="material-icons">add</i>
          </div>
        </div>
      </div>
    )
  }
}

export default BudgetItem;