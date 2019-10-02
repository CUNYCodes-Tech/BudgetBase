import React, { Component } from 'react'

export class TransactionItem extends Component {
    state = {
        date : '10/01/19',
        type : ['Food', 'Housing', 'Transportation'],
        cost : '2550'
    };

    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit} className = "form">
                    <p></p>
                    <div className="row" >
                        <div className ="col s12 m3"  >
                           <p>{this.state.date}</p>
                        </div>
                         <div className="col s12 m3" >
                           <p>{this.state.type[1]}</p>
                        </div>
                        <div className ="col s12 m3"  >
                           <p>{this.state.cost + ' $'} </p>
                        </div> 
                        
                        <div className ="col s12 m1"  >
                            <i className="fas fa-edit"></i>
                        </div> 
                        <div className ="col s12 m1"  >
                            <i className="fas fa-eraser"></i>
                        </div> 
                    </div>
                </form>
            </div> 
        )
    }
}

export default TransactionItem
