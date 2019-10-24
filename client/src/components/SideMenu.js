import React from 'react';

import M from 'materialize-css';
import AddBalanceForm from './forms/AddBalanceForm';
import ReportForm from './forms/ReportForm';
import ImportExportForm from './forms/ImportExportForm';
import TransactionForm from './forms/TransactionForm';

// Assets
import ProfilePicture from '../assets/img/profile-picture.png';
import Separator from '../assets/img/Separator.png'

class SideMenu extends React.Component {
  state = { firstName: "", lastName: "", balance: null };

  componentDidMount() {
    this.fetchUser();
    this.setSideMenuWidth();
    window.addEventListener('resize', this.setSideMenuWidth);
    const elems = document.querySelectorAll('#dateFilter');
    M.Datepicker.init(elems);
  }

  handleAddBalance = () => {
    this.props.setModalTitle('Add Balance');
    this.props.setModalContent(
      <AddBalanceForm
        fetchBalance={this.props.fetchBalance}
        toggleModal={this.props.toggleModal}
      />
    );
  fetchUser = async () => {
    const response = await fetch('/api/user/', {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    });
    const data = await response.json();
    this.setState({ firstName: data.firstName, lastName: data.lastName, balance: data.balance });
  }

  setSideMenuWidth() {
    const parWidth = document.querySelector('.side-menu-container').offsetWidth;
    document.querySelector('.side-menu').setAttribute('style', `width:${parWidth}px!important`);
  }

  handleUpdateBudget = () => {
    this.props.setModalTitle('Update Budget');
    this.props.setModalContent(<UpdateBudgetForm fetchUser={this.fetchUser} toggleModal={this.props.toggleModal} />)
    this.props.toggleModal();
  };

  handleReports = () => {
    this.props.setModalTitle('Reports');
    this.props.setModalContent(
      <ReportForm
        transactions={this.props.transactions}
        toggleModal={this.props.toggleModal}
      />
    );
    this.props.toggleModal();
  };

  handleImportExport = () => {
    this.props.setModalTitle('Import / Export');
    this.props.setModalContent(
      <ImportExportForm toggleModal={this.props.toggleModal} />
    );
    this.props.toggleModal();
  };

  handleNewTransaction = () => {
    this.props.setModalTitle('New Transaction');
    let budgetNameList = ["Book1", "Book2", "Book3", "Book4"];
    let categoriesList = ["", "Eating out", "Fuel", "Clothes", "Entertainment", "General", "Gifts", "Holidays", "Kids", "Shopping", "Sports", "Travel"];
    this.props.setModalContent(
      <TransactionForm 
        toggleModal={this.props.toggleModal} 
        fetchTransactions={this.props.fetchTransactions} 
        fetchUser={this.fetchUser} 
        budgetNameList = {budgetNameList}
        categoriesList = {categoriesList}/>
    );
    this.props.toggleModal();
  }

  render() {
    return (
      <div className="center side-menu">
        <div className="row side-menu-header">
          <div className="col s12">
            <img id="profile-pic" src={ProfilePicture} />
            <h5 id="fullname">{this.state.firstName} {this.state.lastName}</h5>
            <div className="balance-container white-text">
              $ <span className="balance">{this.state.balance}</span>
            </div>
            <img id="separator" src={Separator} />
          </div>
        </div>
        <div className="row buttons-row">
          <div className="col s12">
            <button className="btn side-btn" onClick={this.handleUpdateBudget}>Add Balance</button>
            <button className="btn side-btn" onClick={this.handleNewTransaction}>New Transaction</button>
          </div>
        </div>
        <div className="row financial-row">
          <div className="col s6 income-container">
            <div className="row income-wrapper valign-wrapper">
              <div className="col s3 valign-wrapper">
                <i className="financial-icon fas fa-chevron-circle-down" />
              </div>
              <div className="financial-name-container col s9">
                <h7 className="financial-name">Income</h7>
                <h6 className="financial-amount">$35,000</h6>
              </div>
            </div>
          </div>
          <div className="col s6 spending-container">
            <div className="row spending-wrapper valign-wrapper">
              <div className="col s3">
                <i className="financial-icon fas fa-chevron-circle-up" />
              </div>
              <div className="financial-name-container col s9">
                <h7 className="financial-name">Spending</h7>
                <h6 className="financial-amount">$12,000</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row bank-acc-row">
          <div className="col s12 bank-acc-container">
            <h7 id="bank-acc">Bank Account</h7>
            <div className="bank-info">
              <div class="add-btn btn-floating btn-large waves-light">
                <i class="material-icons">add</i>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className='input-field col s7'>
            <input id='dateFilter' type='text' className='datepicker' />
            <label>Pick a Date</label>
          </div>
          <div className='input-field col s5'>
            <button className='btn'>Filter</button>
          </div>
<<<<<<< HEAD
          {/* <Link className='btn sidemenu-button' to='/dashboard/update-budget'>
            Update Budget
          </Link> */}
          <button
            className='btn sidemenu-button'
            onClick={this.handleAddBalance}
          >
            Add Balance
          </button>
          <button className='btn sidemenu-button' onClick={this.handleReports}>
            Reports
          </button>
          <button className='btn sidemenu-button'>Checking Account</button>
          <button
            className='btn sidemenu-button'
            onClick={this.handleImportExport}
          >
            Import / Export
          </button>
        </div>
=======
        </div> */}
        {/* <div className="row">
          <div className="col s12">
            <button className='btn sidemenu-button' onClick={this.handleReports}>Reports</button>
            <button className='btn sidemenu-button'>Checking Account</button>
            <button className='btn sidemenu-button' onClick={this.handleImportExport}>Import / Export</button>
          </div>
        </div> */}
>>>>>>> 441f7a187966b109f81442290907b015ede51eb3
      </div>
    );
  }
}

export default SideMenu;
