import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return props.showModal? ReactDOM.createPortal(
    <div className="modal-container" onClick={ () => { props.toggleModal(); } }>
      <div className="modal-content row" onClick={ e => { e.stopPropagation() }}>
        <h4 className="center">{props.title}</h4>
        {props.children}
      </div>
    </div>, 
    document.querySelector('#modal')
  ) : null;
}

export default Modal;