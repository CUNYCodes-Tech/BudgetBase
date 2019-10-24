import React, { useEffect } from 'react';

import M from 'materialize-css';

const AddBalanceForm = props => {
  useEffect(() => {
    const selector = document.querySelectorAll('#selector');
    M.FormSelect.init(selector);
  }, []);

  const handleAddBalance = async () => {
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    await response.json();

    this.props.fetchBalance();
    this.props.toggleModal();
  };

  const handleChange = e => {
    this.setState({ balance: e.target.value });
  };

  return (
    <div className='modal-container'>
      <div className='modal-content row'>
        <h4 className='center'>Add Balance</h4>
        <div className='input-field col s12'>
          <input
            id='newBalance'
            type='number'
            placeholder='Amount'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-field col s12'>
          <select name='addNewBalance' id='selector'>
            <option value='cash' selected>
              Cash
            </option>
            <option value='deposit'>Direct Deposit</option>
            <option value='atm-deposit'>ATM Deposit</option>
          </select>
        </div>
        <div className='input-field col s6'>
          <button className='btn' onClick={handleAddBalance}>
            Submit
          </button>
        </div>
        <div className='input-field col s6'>
          <button className='btn' onClick={props.toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBalanceForm;
