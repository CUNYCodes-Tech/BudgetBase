import React from 'react';
import ActivityContainer from './ActivityContainer'

class ActivityMenu extends React.Component {

    state  = {
        transactions: [
            {name: 'Subway', date: '10/01/19', type: 'Transportation', cost: 2.75},   
            {name: 'Uber', date: '10/01/19',type: 'Transportation', cost: 10.34 }, 
            {name: 'Fruits', date: '10/02/19', type: 'Food',cost: 8.54},  
            {name: 'Pizza', date: '10/02/19', type: 'Food',cost: 5.34},   
            {name: 'Snack', date: '10/03/19', type: 'Food',cost: 3.96}   
        ], 
        budgetLeft: 354
    }
    render() {
        const {transactions , budgetLeft}= this.state;
       
        return (
            <div className = "center">
                Activity Menu
                <div className="row" >
                    <div className ="col s12 m6">
                        <p>Budget Left:</p>
                    </div>
                    <div className ="col s12 m6"  >
                        <p>{this.state.budgetLeft + ' $'}</p>
                    </div>
                </div> 

                <input 
                    type = "submit" 
                    value = "New Transaction" 
                    className = "btn btn-dark btn-block" 
                />
                
                <ActivityContainer transactions = {transactions} />
            </div>

        );
    }
}

export default ActivityMenu;