import React, { Component } from 'react'

// ------------------------------------------------------------------
// functional Components
// ------------------------------------------------------------------

const TransactionItem = ( {transaction: {name, date, type, cost}}) => {
    return (
      <div className="card-panel item-container">
        <div className="row item">
          <div className="col s2">{date}</div>
          <div className="col s2">{name}</div>
          <div className="col s2">${cost}</div>
          <div className="col s3">{type}</div>
          <div className="col s1">
            <i className="material-icons edit">edit</i>
          </div>
          <div className="col s1">
            <i className="material-icons delete">delete</i>
          </div>
        </div>
      </div>
    );
    // const style = {
    //    border: '0.5px solid lightgray'
    // }
    // return (
    //     <div className = "TransactionItem" style = {style}>
    //         <p></p>
    //         <form className = "form" style = {style}>
    //             <div className="row" >
    //                 <div className ="col s12 m3">
    //                     <p>{name}</p>
    //                 </div>
    //                 <div className="col s12 m2" >
    //                     <p>{date}</p>
    //                 </div>
    //                 <div className="col s12 m3" >
    //                     <p>{type}</p>
    //                 </div>
    //                 <div className ="col s12 m2"  >
    //                     <p>{cost+ ' $'} </p>
    //                 </div> 
    //                 <div className ="col s12 m1"  >
    //                     <i className="fas fa-edit"></i>
    //                 </div> 
    //                 <div className ="col s12 m1"  >
    //                     <i className="fas fa-eraser"></i>
    //                 </div> 
    //             </div>
    //         </form>
    //     </div> 
    // )
}


// ------------------------------------------------------------------
// Class based Components
// ------------------------------------------------------------------
// export class TransactionItem extends Component {
//     state = {
//         date : '10/01/19',
//         type : ['Food', 'Housing', 'Transportation'],
//         cost : '2550'
//     };

//     render() {
//         const style = {
//             border: '1px solid green'
//         }

        // return (
        //     <div>
        //         <form onSubmit = {this.onSubmit} className = "form">
        //             <p></p>
        //             <div className="row" style = {style} >
        //                 <div className ="col s12 m3">
        //                    <p>{this.state.date}</p>
        //                 </div>
        //                  <div className="col s12 m3" >
        //                    <p>{this.state.type[1]}</p>
        //                 </div>
        //                 <div className ="col s12 m3"  >
        //                    <p>{this.state.cost + ' $'} </p>
        //                 </div> 
                        
        //                 <div className ="col s12 m1"  >
        //                     <i className="fas fa-edit"></i>
        //                 </div> 
        //                 <div className ="col s12 m1"  >
        //                     <i className="fas fa-eraser"></i>
        //                 </div> 
        //             </div>
        //         </form>
        //     </div> 
        // )
//     }
// }

export default TransactionItem
