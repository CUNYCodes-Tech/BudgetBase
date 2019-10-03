import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import M from "materialize-css";
import history from '../history';

const Modal = props => {
  useEffect(() => {
    M.AutoInit();
  }, [])

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-content row">
        <h4 className="center">New Transaction</h4>
        <div className="input-field col s12">
          <input id="Date" type="date" />
          <label>Date</label>
        </div>
        <div className="input-field col s12">
          <input id="Cost" type="number" placeholder="Cost" require />
          <label>Cost</label>
        </div>
        <div className="input-field col s12">
          <select>
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
          <textarea class="materialize-textarea"></textarea>
          <label>Enter a note</label>
        </div>
        <div className="input-field col s6">
          <button className="btn">Submit</button>
        </div>
        <div className="input-field col s6">
          <button className="btn" onClick={() => history.push('/dashboard')}>Cancel</button>
        </div>
      </div>
    </div>, 
    document.querySelector('#modal')
  );
}

export default Modal;