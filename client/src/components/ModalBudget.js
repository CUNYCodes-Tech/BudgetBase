import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import M from 'materialize-css';
import history from '../history';

const ModalBudget = props => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return ReactDOM.createPortal(
    <div className='modal-container'>
      <div className='modal-content row'>
        <h4 className='center'>Add Budget</h4>
        <div className='input-field col s12'>
          <input id='newBudget' type='number' placeholder='Amount' required />
        </div>
        <div className='input-field col s6'>
          <button className='btn'>Submit</button>
        </div>
        <div className='input-field col s6'>
          <button className='btn' onClick={() => history.push('/dashboard')}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default ModalBudget;
