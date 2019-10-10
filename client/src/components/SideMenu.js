import React from 'react';
import { Link } from 'react-router-dom';

import M from "materialize-css";
import Modal from './Modal'

class SideMenu extends React.Component {
  componentDidMount() {
    const elems = document.querySelectorAll('#dateFilter');
    M.Datepicker.init(elems);
  }

  render() {
    return (
      <div className="center sidemenu-container">
        <div className="row">
          <div className="input-field col s7">
            <input type="date" />
          </div>
          <div className="input-field col s5">
            <button className="btn">Filter</button>
          </div>
          <Link
            to="/dashboard/new-budget"
            id="new-budget"
            className="btn sidemenu-button"
          >
            Add Budget
          </Link>
          {/* <button className="btn sidemenu-button">Add Budget</button> */}
          <button className="btn sidemenu-button">Reports</button>
          <button className="btn sidemenu-button">Checking Account</button>
          <button className="btn sidemenu-button">Import / Export</button>
        </div>
      </div>
    );
  }
}

export default SideMenu;
