import React, { useEffect, useState } from 'react';

import M from 'materialize-css';

const AddBalanceForm = props => {
  const [form, setForm] = useState({ balance: 0, category: 'Cash Deposit' })

  useEffect(() => {
    const selector = document.querySelectorAll('#selector');
    M.FormSelect.init(selector);
  }, []);

  const handleAddBalance = async () => {
    const response = await fetch('/api/user/addbalance', {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    await response.json();

    props.fetchUser();
    props.fetchTransactions();
    props.toggleModal();
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  return (
    <div className='modal-container'>
      <div className='modal-content row'>
        <h4 className='center'>Add Balance</h4>
        <div className='input-field col s12'>
          <input
            id='newBalance'
            name="balance"
            type='number'
            placeholder='Amount'
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-field col s12'>
          <select name='category' id='selector' onChange={handleChange}>
            <option value="Cash Deposit" selected>
              Cash Deposit
            </option>
            <option value='Direct Deposit'>Direct Deposit</option>
            <option value='ATM Deposit'>ATM Deposit</option>
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
