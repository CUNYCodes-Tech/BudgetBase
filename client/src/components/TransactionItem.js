import React, { Component } from 'react'
import DeleteItemForm from './forms/DeleteItemForm'

// ------------------------------------------------------------------
// functional Components
// ------------------------------------------------------------------

class TransactionItem extends React.Component{

  handleModal = () =>{
    this.props.setModalTitle(`Delete ${this.props.transaction.name}?`);
    this.props.setModalContent(<DeleteItemForm id={this.props.transaction._id} cost={this.props.transaction.cost} toggleModal = {this.props.toggleModal} fetchBudget={this.props.fetchBudget} fetchTransactions={this.props.fetchTransactions}/>);
    this.props.toggleModal();
  }

  render(){
    return(
      <div className="card-panel item-container">
        <div className="row item">
          <div className="col s2">{new Date(this.props.transaction.createdAt).toDateString()}</div>
          <div className="col s2">{this.props.transaction.name}</div>
          <div className="col s2">${this.props.transaction.cost}</div>
          <div className="col s3">{this.props.transaction.category}</div>
          <div className="col s1">
            <i className="material-icons edit">edit</i>
          </div>
          <div className="col s1">
            <i className="material-icons delete" onClick = {this.handleModal}>delete</i>
          </div>
        </div>
      </div>
    )
  }
}
export default TransactionItem;
// const TransactionItem = ( {transaction: {name, createdAt, category, cost}}) => {
//     return (
//       <div className="card-panel item-container">
//         <div className="row item">
//           <div className="col s2">{new Date(createdAt).toDateString()}</div>
//           <div className="col s2">{name}</div>
//           <div className="col s2">${cost}</div>
//           <div className="col s3">{category}</div>
//           <div className="col s1">
//             <i className="material-icons edit">edit</i>
//           </div>
//           <div className="col s1">
//             <i className="material-icons delete">delete</i>
//           </div>
//         </div>
//       </div>
//     );
//     // const style = {
//     //    border: '0.5px solid lightgray'
//     // }
//     // return (
//     //     <div className = "TransactionItem" style = {style}>
//     //         <p></p>
//     //         <form className = "form" style = {style}>
//     //             <div className="row" >
//     //                 <div className ="col s12 m3">
//     //                     <p>{name}</p>
//     //                 </div>
//     //                 <div className="col s12 m2" >
//     //                     <p>{date}</p>
//     //                 </div>
//     //                 <div className="col s12 m3" >
//     //                     <p>{type}</p>
//     //                 </div>
//     //                 <div className ="col s12 m2"  >
//     //                     <p>{cost+ ' $'} </p>
//     //                 </div> 
//     //                 <div className ="col s12 m1"  >
//     //                     <i className="fas fa-edit"></i>
//     //                 </div> 
//     //                 <div className ="col s12 m1"  >
//     //                     <i className="fas fa-eraser"></i>
//     //                 </div> 
//     //             </div>
//     //         </form>
//     //     </div> 
//     // )
// }


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

//export default TransactionItem
