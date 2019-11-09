import React, { useEffect, useState } from 'react';

import M from 'materialize-css';

const TransactionForm = props => {
  const [form, setForm] = useState({
    createdAt: new Date(),
    cost: 0,
    category: null,
    name: null,
    budgetId: null,
    paymentType: 'cash'
  });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const datepicker = document.querySelector('#transactionDate');
    const selector = document.querySelectorAll('#selector');
    M.Datepicker.init(datepicker, { onSelect: date => setForm({ ...form, createdAt: date }), defaultDate: form.createdAt, setDefaultDate: true });
    M.FormSelect.init(selector);
  }, [form]);

  const createTransaction = async e => {
    e.preventDefault();
    const response = await fetch('/api/transaction/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify(form)
    });
    
    props.fetchTransactions();
    props.fetchUser();
    props.fetchBudgets();
    props.toggleModal();
  };

  const createBudgetOptions = () => {
    let budgetList = [];
    let options = [];

    options.push(
      <option>-- Choose a Budget --</option>
    )

    for (let i = 0; i < props.budgets.length; i++) {
      if (!props.budgets[i].name) break;
      options.push(
        <option value={props.budgets[i]._id}>
          {props.budgets[i].name}
        </option>
      );
    }
    budgetList.push(
      <select name='budgetId' id='selector' onChange={handleChange}>
        {options}
      </select>
    );
    return budgetList;
  };

  const createCategriesOptions = () => {
    let categoriesList = [];
    let options = [];
    for (let i = 0; i < props.categoriesList.length; i++) {
      options.push(
        <option value={props.categoriesList[i]}>
          {props.categoriesList[i]}
        </option>
      );
    }
    categoriesList.push(
      <select name='category' id='selector' onChange={handleChange}>
        {options}
      </select>
    );
    return categoriesList;
  };

  const createPaymentRadio = () => {
    let paymentForm = [];
    paymentForm.push(
      <form action='#'>
        <label>
          <input
            checked={form.paymentType === 'cash'}
            name='paymentType'
            type='radio'
            value='cash'
            onChange={handleChange}
          />
          <span>Cash</span>
        </label>
        <label>
          <input
            checked={form.paymentType === 'debit/credit'}
            name='paymentType'
            type='radio'
            value='debit/credit'
            onChange={handleChange}
          />
          <span>Debit/Credit</span>
        </label>
      </form>
    );
    return paymentForm;
  };

  return (
    <form onSubmit={createTransaction}>
      <div className='input-field col s12'>
        <input
          id='transactionDate'
          name='createdAt'
          value={form.createdAt}
          type='text'
          className='datepicker'
          placeholder="Enter a date"
        />
      </div>
      <div className='input-field col s12'>
        <input
          id='Cost'
          name='cost'
          type='number'
          onChange={handleChange}
          min={0}
          require
        />
        <label>Cost</label>
      </div>
      <div className='input-field col s12'>
        {createCategriesOptions()}
        <label>Category</label>
      </div>
      <div className='input-field col s12'>
        <input type='text' name='name' onChange={handleChange} />
        <label>Enter the name</label>
      </div>
      <div className='input-field col s12'>
        {createBudgetOptions()}
        <label>Budget</label>
      </div>
      <div>
        {createPaymentRadio()}
        <label>Payment</label>
      </div>
      <div className='input-field col s6'>
        <input className='btn' type="submit" value="Submit" />
      </div>
      <div className='input-field col s6'>
        <button className='btn' onClick={() => props.toggleModal()}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
