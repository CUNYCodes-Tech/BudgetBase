import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return props.showModal? ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-content row">
        <h4 className="center">{props.title}</h4>
        {props.children}
        <div className="input-field col s6">
          <button className="btn">Submit</button>
        </div>
        <div className="input-field col s6">
          <button className="btn" onClick={() => props.toggleModal()}>Cancel</button>
        </div>
      </div>
    </div>, 
    document.querySelector('#modal')
  ) : null;
}

export default Modal;