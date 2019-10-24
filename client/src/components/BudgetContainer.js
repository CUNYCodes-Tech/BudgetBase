import React from 'react';
import BudgetItem from './BudgetItem';

class BudgetContainer extends React.Component {
    
    state = {
        budgets:
        [
            {name : "Budget a", amount : 300},
            {name : "Budget b", amount : 500},
            {name : "Budget c", amount : 600}
        ]
    };

    render() {
        return (
        <div className="row">
            {/* <div>{this.state.budgets[0].name}</div> */}
            <BudgetItem idx={0}  name = {this.state.budgets[0].name} amount = {this.state.budgets[0].amount}  /> 
            <BudgetItem idx={0}  name = {this.state.budgets[1].name} amount = {this.state.budgets[1].amount}  /> 
            <BudgetItem idx={0}   amount = {this.state.budgets[2].amount}  /> 
        </div>
        );
    }
}

export default BudgetContainer;