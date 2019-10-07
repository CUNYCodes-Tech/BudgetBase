import React, { useEffect } from 'react';

import M from "materialize-css";

const TransactionForm = () => {
  useEffect(() => {
    const datepicker = document.querySelectorAll('#transactionDate');
    const selector = document.querySelectorAll('#selector')
    M.Datepicker.init(datepicker);
    M.FormSelect.init(selector);
  }, []);

  return (
    <div>
      <div className="input-field col s12">
        <input id="transactionDate" type="text" className="datepicker" />
        <label>Date</label>
      </div>
      <div className="input-field col s12">
        <input id="Cost" type="number" require />
        <label>Cost</label>
      </div>
      <div className="input-field col s12">
        <select id="selector">
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
        <textarea className="materialize-textarea"></textarea>
        <label>Enter a note</label>
      </div>
    </div>
  );
}

export default TransactionForm;