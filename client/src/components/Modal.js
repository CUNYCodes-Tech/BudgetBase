import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return props.showModal? ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-content row">
        <h4 className="center">{props.title}</h4>
        {props.children}
      </div>
    </div>, 
    document.querySelector('#modal')
  ) : null;
}

export default Modal;