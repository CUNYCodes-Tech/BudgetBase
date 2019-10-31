import React from 'react';

class CreateBudgetForm extends React.Component {
  state = { name: '', amount: 0 };

  render() {
    return (
      <>
        <div className="input-field col s12">
          <input id="name" name="name" type="text" onChange={this.handleChange} />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field col s12">
          <input id="amount" name="amount" type="number" min={0} onChange={this.handleChange} />
          <label htmlFor="amount">Amount</label>
        </div>
        <div className='input-field col s6'>
          <button className='btn' onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
        <div className='input-field col s6'>
          <button className='btn' onClick={() => this.props.toggleModal()}>
            Cancel
          </button>
        </div>
      </>
    );
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async () => {
    const response = await fetch('/api/budget/create', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    this.props.toggleModal();
    this.props.fetchBalance();
    this.props.fetchBudgets();
  }
}

export default CreateBudgetForm;