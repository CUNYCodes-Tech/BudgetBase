import React from 'react';

import M from "materialize-css";

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
              <input id="dateFilter" type="text" className="datepicker" />
              <label>Pick a Date</label>
            </div>
            <div className="input-field col s5">
              <button className="btn">Filter</button>
            </div>
            <button className="btn sidemenu-button">Add Budget</button>
            <button className="btn sidemenu-button">Reports</button>
            <button className="btn sidemenu-button">Checking Account</button>
            <button className="btn sidemenu-button">Import / Export</button>
          </div>
      </div>
    );
  }
}

export default SideMenu;