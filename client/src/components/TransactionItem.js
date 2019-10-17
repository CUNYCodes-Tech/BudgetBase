import React from 'react'

import DeleteItemForm from './forms/DeleteItemForm'

// ------------------------------------------------------------------
// functional Components
// ------------------------------------------------------------------

class TransactionItem extends React.Component{
  state = { 
    isEdit: false,
    createdAt: this.props.transaction.createdAt,
    cost: this.props.transaction.cost,
    category: this.props.transaction.category,
    name: this.props.transaction.name
  }

  convertDate = date => {
    const d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  handleModal = () => {
    this.props.setModalTitle(`Delete ${this.props.transaction.name}`);
    this.props.setModalContent(<DeleteItemForm id={this.props.transaction._id} cost={this.props.transaction.cost} toggleModal = {this.props.toggleModal} fetchBalance={this.props.fetchBalance} fetchTransactions={this.props.fetchTransactions}/>);
    this.props.toggleModal();
  }

  isSelected = val => {
    return val === this.props.transaction.category;
  }

  onEdit = async () => {
    const { isEdit, ...form } = this.state;
    const response = await fetch(`/api/transaction/update/${this.props.transaction._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    await response.json();
    this.props.fetchTransactions();
    this.props.fetchBalance();
  }

  renderItem = () => {
    return !this.state.isEdit
    ? (
      <>
        <div className="col s2">
          {this.convertDate(this.props.transaction.createdAt)}
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
          <input type="date" className="date" onChange={e => this.setState({ createdAt: e.target.value })} value={this.convertDate(this.state.createdAt)} required />
        </div>
        <div className="col s2">
          <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}  />
        </div>
        <div className="col s2">
          <input type="number" value={this.state.cost} onChange={e => this.setState({ cost: e.target.value })} />
        </div>
        <div className="col s3">
          <select name="category" className="browser-default" onChange={e => this.setState({ category: e.target.value })}>
            <option value="Eating Out" selected={this.isSelected('Eating Out')}>Eating Out</option>
            <option value="Fuel" selected={this.isSelected('Fuel')}>Fuel</option>
            <option value="Clothes" selected={this.isSelected('Clothes')}>Clothes</option>
            <option value="Entertainment" selected={this.isSelected('Entertainment')}>Entertainment</option>
            <option value="General" selected={this.isSelected('General')}>General</option>
            <option value="Gifts" selected={this.isSelected('Gifts')}>Gifts</option>
            <option value="Holidays" selected={this.isSelected('Holidays')}>Holidays</option>
            <option value="Kids" selected={this.isSelected('Kids')}>Kids</option>
            <option value="Shopping" selected={this.isSelected('Shopping')}>Shopping</option>
            <option value="Sports" selected={this.isSelected('Sports')}>Sports</option>
            <option value="Travel" selected={this.isSelected('Travel')}>Travel</option>
          </select>
        </div>
        <div className="col s1">
          <i className="material-icons save" onClick={() => { this.setState({ isEdit: false }); this.onEdit(); }}>save</i>
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