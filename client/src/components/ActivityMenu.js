import React from 'react';
import TransactionItem from './TransactionItem'

class ActivityMenu extends React.Component {
  render() {
    return (
    
        <div className = "center">
            Activity Menu
            <div className="row" >
                <div className ="col s12 m6">
                    <p>Budget Left:</p>
                </div>
                <div className ="col s12 m6"  >
                    <p>3405 $</p>
                </div>
            </div> 

            <input 
                type = "submit" 
                value = "New Transaction" 
                className = "btn btn-dark btn-block" 
            />
            
            <TransactionItem />
       </div>

    );
  }
}

export default ActivityMenu;