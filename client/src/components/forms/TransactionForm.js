import React, { useEffect, useState } from 'react';

import M from "materialize-css";

const TransactionForm = props => {
  const [form, setForm] = useState({ createdAt: null, cost: 0, category: null, name: null });
  const { createdAt, cost, category, name } = form;
  console.log(form);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const datepicker = document.querySelector('#transactionDate');
    const selector = document.querySelectorAll('#selector')
    M.Datepicker.init(datepicker);
    M.FormSelect.init(selector);

    datepicker.addEventListener('change', e => {
      handleChange(e);
    });
  }, []);

  const createTransaction = async () => {
    const response = await fetch('/api/transaction/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(form)
    });

    props.fetchTransactions();
    props.fetchBudget();
    props.toggleModal();
  }

  return (
    <div>
      <div className="input-field col s12">
        <input id="transactionDate" name="createdAt" type="text" className="datepicker" />
        <label>Date</label>
      </div>
      <div className="input-field col s12">
        <input id="Cost" name="cost" type="number" onChange={handleChange} min={0} require />
        <label>Cost</label>
      </div>
      <div className="input-field col s12">
        <select name="category" id="selector" onChange={handleChange}>
          <option value="">--Please choose an option--</option>
          <option value="Eating Out">Eating Out</option>
          <option value="Fuel">Fuel</option>
          <option value="Clothes">Clothes</option>
          <option value="Entertainment">Entertainment</option>
          <option value="General">General</option>
          <option value="Gifts">Gifts</option>
          <option value="Holidays">Holidays</option>
          <option value="Kids">Kids</option>
          <option value="Shopping">Shopping</option>
          <option value="Sports">Sports</option>
          <option value="Travel">Travel</option>
        </select>
        <label>Category</label>
      </div>
      <div className="input-field col s12">
        <input type="text" name="name" onChange={handleChange} />
        <label>Enter the name</label>
      </div>
      <div className="input-field col s6">
        <button className="btn" onClick={createTransaction}>Submit</button>
      </div>
      <div className="input-field col s6">
        <button className="btn" onClick={() => props.toggleModal()}>Cancel</button>
      </div>
    </div>
  );
}

export default TransactionForm;