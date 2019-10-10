import React from 'react';
import { Link } from 'react-router-dom';

import M from 'materialize-css';
import UpdateBudgetForm from './forms/UpdateBudgetForm';
import ReportForm from './forms/ReportForm';
import ImportExportForm from './forms/ImportExportForm';

class SideMenu extends React.Component {
  componentDidMount() {
    const elems = document.querySelectorAll('#dateFilter');
    M.Datepicker.init(elems);
  }

  handleUpdateBudget = () => {
    this.props.setModalTitle('Update Budget');
    this.props.setModalContent(<UpdateBudgetForm fetchBudget={this.props.fetchBudget} toggleModal={this.props.toggleModal} />)
    this.props.toggleModal();
  }

  handleReports = () => {
    this.props.setModalTitle('Reports');
    this.props.setModalContent(<ReportForm toggleModal={this.props.toggleModal} />)
    this.props.toggleModal();
  }

  handleImportExport = () => {
    this.props.setModalTitle('Import / Export');
    this.props.setModalContent(<ImportExportForm toggleModal={this.props.toggleModal} />)
    this.props.toggleModal();
  }

  render() {
    return (
      <div className='center sidemenu-container'>
        <div className='row'>
          <div className='input-field col s7'>
            <input id='dateFilter' type='text' className='datepicker' />
            <label>Pick a Date</label>
          </div>
          <div className='input-field col s5'>
            <button className='btn'>Filter</button>
          </div>
          {/* <Link className='btn sidemenu-button' to='/dashboard/update-budget'>
            Update Budget
          </Link> */}
          <button className="btn sidemenu-button" onClick={this.handleUpdateBudget}>Update Budget</button>
          <button className='btn sidemenu-button' onClick={this.handleReports}>Reports</button>
          <button className='btn sidemenu-button'>Checking Account</button>
          <button className='btn sidemenu-button' onClick={this.handleImportExport}>Import / Export</button>
        </div>
      </div>
    );
  }
}

export default SideMenu;
