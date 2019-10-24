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
                            <div class = "dashboard-title white-text balance center">{name}</div>
                            <div class = "dashboard-title white-text balance center">$ {amount}</div>
                        </div> ) : (
                        <div className={`budget-item ${bg}`}>
                        <div class={`${btnbg} add-btn btn-floating btn-large waves-light`}>
                            <i class="material-icons">add</i>
                        </div>
                    </div> 
                    )}
                </div>
            </div>
        )
    }
}

export default BudgetItem;