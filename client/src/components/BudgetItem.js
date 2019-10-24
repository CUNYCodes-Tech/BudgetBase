import React from 'react';

class BudgetItem extends React.Component {
  render() {
    const {name, amount} = this.props;
    
    const bg = this.props.idx % 2? "teal-bg" : "light-blue-bg";
    const btnbg = this.props.idx % 2? "light-blue-bg" : "teal-bg"
    return (
      <div className="budget-item-container col s4">
        <div>
          {name ? (
            <div className={`budget-item ${bg}`}>
              <div className="budget-title">{name}</div>
              <div className="budget-amount">${amount}</div>
              <div className="progress-bar"></div>
            </div> ) : (
            <div className={`budget-item ${bg}`}>
              <div className={`${btnbg} add-btn btn-floating btn-large waves-light`}>
                <i className="material-icons">add</i>
              </div>
            </div> 
          )}
        </div>
      </div>
    )
  }
}

export default BudgetItem;