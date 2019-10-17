import React from 'react'

import DeleteItemForm from './forms/DeleteItemForm'
import M from "materialize-css";

// ------------------------------------------------------------------
// functional Components
// ------------------------------------------------------------------

class TransactionItem extends React.Component{
  state = { isEdit: false }

  handleModal = () => {
    this.props.setModalTitle(`Delete ${this.props.transaction.name}`);
    this.props.setModalContent(<DeleteItemForm id={this.props.transaction._id} cost={this.props.transaction.cost} toggleModal = {this.props.toggleModal} fetchBalance={this.props.fetchBalance} fetchTransactions={this.props.fetchTransactions}/>);
    this.props.toggleModal();
  }

  isSelected = val => {
    return val === this.this.props.transaction.category;
  }

  renderItem = () => {
    return !this.state.isEdit
    ? (
      <>
        <div className="col s2">
          {new Date(this.props.transaction.createdAt).toDateString()}
        </div>
        <div className="col s2">{this.props.transaction.name}</div>
        <div className="col s2">${this.props.transaction.cost}</div>
        <div className="col s3">{this.props.transaction.category}</div>
        <div className="col s1 center-align">
          <i className="material-icons edit" onClick={() => this.setState({ isEdit: true })}>edit</i>
        </div>
        <div className="col s1 center-align">
          <i className="material-icons delete" onClick = {this.handleModal}>delete</i>
        </div>
      </>
    )
    : (
      <>
        <div className="col s2">
          <input type="text" value={new Date(this.props.transaction.createdAt).toDateString()} />
        </div>
        <div className="col s2">
          <input type="text" value={this.props.transaction.name} />
        </div>
        <div className="col s2">
          <input type="number" value={this.props.transaction.cost} />
        </div>
        <div className="col s3">
          <select name="category" className="browser-default">
            <option value="Eating Out">Eating Out</option>
            <option value="Fuel">Fuel</option>
            <option value="Clothes" selected={false}>Clothes</option>
            <option value="Entertainment">Entertainment</option>
            <option value="General">General</option>
            <option value="Gifts">Gifts</option>
            <option value="Holidays">Holidays</option>
            <option value="Kids">Kids</option>
            <option value="Shopping">Shopping</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div className="col s1">
          <i className="material-icons save" onClick={() => this.setState({ isEdit: false })}>save</i>
        </div>
        <div className="col s1">
          <i className="material-icons delete" onClick = {this.handleModal}>delete</i>
        </div>
      </>
    )
  }

  render(){
    return(
      <div className="card-panel item-container">
        <div className="row item valign-wrapper">
          {this.renderItem()}
        </div>
      </div>
    )
  }
}
export default TransactionItem;