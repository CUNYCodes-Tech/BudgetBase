import React from 'react';

class DeleteBankAccountForm extends React.Component {
  handleClick = async () => {
    const response = await fetch(`/api/plaid/accounts/delete/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    this.props.toggleModal();
    this.props.fetchBankAccounts();
  }

  render() {
    return (
      <div>
        <div>Are you sure?</div>
        <div className = "input-field col s6">
          <button className = "btn red" onClick={this.handleClick}>Delete</button>
        </div>
        <div className = "input-field col s6">
          <button className = "btn" onClick = {() => this.props.toggleModal()}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default DeleteBankAccountForm;