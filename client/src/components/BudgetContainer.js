import React from 'react';
import BudgetItem from './BudgetItem';

class BudgetContainer extends React.Component {
  render() {
    return (
      <div className="row">
        <BudgetItem idx={0} />
        <BudgetItem idx={1} />
        <BudgetItem idx={2} />
      </div>
    );
  }
}

export default BudgetContainer;