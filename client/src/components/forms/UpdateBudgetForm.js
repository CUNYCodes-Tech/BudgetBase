import React from 'react'

class UpdateBudgetForm extends React.Component{
  state = { balance: 0 }

  handleUpdateBudget = async () => {
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    const data = await response.json();

    this.props.fetchBudget();
    this.props.toggleModal();
  };

  handleChange = e => {
    this.setState({ balance: e.target.value });
  }

  render(){
    console.log(this.state.balance);
    return(
      <div className='modal-container'>
        <div className='modal-content row'>
          <h4 className='center'>Update Budget</h4>
          <div className='input-field col s12'>
            <input id='newBudget' type='number' placeholder='Amount' onChange={this.handleChange} required />
          </div>
          <div className='input-field col s6'>
            <button className='btn' onClick={this.handleUpdateBudget}>Submit</button>
          </div>
          <div className='input-field col s6'>
            <button className='btn' onClick={this.props.toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBudgetForm;