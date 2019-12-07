import React from 'react';
import moment from 'moment';
import PlaidLinkButton from "react-plaid-link-button";

import M from 'materialize-css';
import AddBalanceForm from './forms/AddBalanceForm';
import ReportForm from './forms/ReportForm';
import ImportExportForm from './forms/ImportExportForm';
import TransactionForm from './forms/TransactionForm';
import UpdateBudgetForm from './forms/UpdateBudgetForm';
import DeleteBankAccountForm from './forms/DeleteBankAccountForm';
import BankTransactionsForm from './forms/BankTransactionsForm';

// Assets
import ProfilePicture from '../assets/img/profile-picture.png';
import Separator from '../assets/img/Separator.png';

class SideMenu extends React.Component {
  state = { bankTransactions: [], bankAccounts: [], firstName: '', lastName: '', avatar: "", balance: 0, spending: 0, income: 0 };

  componentWillReceiveProps({ transactions, bankAccounts, bankTransactions }) {
    this.updateFinancialStatus(transactions);
    this.fetchUser();
    this.setState({ bankAccounts, bankTransactions });
  }

  componentDidMount() {
    this.fetchUser();
    const elems = document.querySelectorAll('#dateFilter');
    M.Datepicker.init(elems);
  }

  render() {
    return (
      <div className='side-menu'>
        <div className='row side-menu-header center'>
          <div className='col s12'>
            <img id="profile-pic" src={this.state.avatar} />
            {/* <img id='profile-pic' src={ProfilePicture} /> */}
            <h5 id='fullname'>
              {this.state.firstName} {this.state.lastName}
            </h5>
            <div className='balance-container white-text'>
              $ <span className='balance'>{this.state.balance.toLocaleString()}</span>
            </div>
            <img id='separator' src={Separator} />
          </div>
          {/* Buttons */}
          <div className='col s12 side-btn-container'>
            <button className='btn side-btn' onClick={this.handleAddBalance}>
              Add Balance
            </button>
            <button
              className='btn side-btn'
              onClick={this.handleNewTransaction}
            >
              New Transaction
            </button>
          </div>
          {/* Financial Status */}
          <div className='col s6 income-container'>
            <div className='row income-wrapper valign-wrapper'>
              <div className='col s3 valign-wrapper'>
                <i className='financial-icon fas fa-chevron-circle-down' />
              </div>
              <div className='financial-name-container col s9'>
                <h7 className='financial-name'>Income</h7>
                <h6 className='financial-amount'>${this.state.income}</h6>
              </div>
            </div>
          </div>
          <div className='col s6 spending-container'>
            <div className='row spending-wrapper valign-wrapper'>
              <div className='col s3'>
                <i className='financial-icon fas fa-chevron-circle-up' />
              </div>
              <div className='financial-name-container col s9'>
                <h7 className='financial-name'>Spending</h7>
                <h6 className='financial-amount'>${this.state.spending}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className='row bank-acc-row'>
          <div className="col s12">
            <h7 id="bank-acc">Bank Account</h7>
          </div>
          
          <div className='col s12 bank-acc-container'>
            <div className='bank-info'>
              {
                !this.state.bankAccounts.length? (
                  <PlaidLinkButton
                    buttonProps={{
                      className: "add-btn btn-floating btn-large waves-light"
                    }}
                    plaidLinkProps={{
                      clientName: "Budgetbase",
                      key: "838c02e0848a46a9b525b5e2d658e6",
                      env: "sandbox",
                      product: ["transactions"],
                      onSuccess: this.handleOnSuccess
                    }}
                    onScriptLoad={() => this.setState({ loaded: true })}
                  >
                    <i class='material-icons'>add</i>
                  </PlaidLinkButton>
                ) : (
                  <>
                    <div className="bank-name">{this.state.bankAccounts[0].institutionName}</div>
                    <i class="fas fa-search fetch-bank" onClick={this.fetchBankTransactions}></i>
                    <i class="fas fa-times-circle delete-bank" onClick={this.deleteBankAccount}></i>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Helper Methods
  // ----------------------------------------------------------------------
  fetchBankTransactions = () => {
    this.props.setModalTitle('Past 30 Days Online Transactions');
    this.props.setModalContent(
      <BankTransactionsForm 
        toggleModal={this.props.toggleModal}
        bankAccounts={this.state.bankAccounts}
        fetchTransactions = {this.props.fetchTransactions}
        budgets={this.props.budgets}
        fetchBudgets={this.props.fetchBudgets}
      />
    );
    this.props.toggleModal();
  }
  
  deleteBankAccount = e => {
    e.stopPropagation();
    this.props.setModalTitle('Delete this Bank Account?');
    this.props.setModalContent(
      <DeleteBankAccountForm 
        toggleModal={this.props.toggleModal}
        fetchBankAccounts={this.props.fetchBankAccounts}
        bankTransactions={this.state.bankTransactions}
        id={this.state.bankAccounts[0]._id}
      />
    );
    this.props.toggleModal();
  }

  handleOnSuccess = async (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    };
    const response = await fetch('/api/plaid/accounts/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: localStorage.getItem('token') 
      },
      body: JSON.stringify(plaidData)
    });

    const data = await response.json();
    this.props.fetchBankAccounts();
  }

  handleAddBalance = () => {
    this.props.setModalTitle('Add Balance');
    this.props.setModalContent(
      <AddBalanceForm
        fetchTransactions = {this.props.fetchTransactions}
        toggleModal={this.props.toggleModal}
        fetchUser={this.fetchUser}
      />
    );
    this.props.toggleModal();
  };

  fetchUser = async () => {
    const response = await fetch('/api/user/', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      balance: data.balance,
      avatar: data.avatar
    });
  };

  // setSideMenuWidth() {
  //   const parWidth = document.querySelector('.side-menu-container').offsetWidth;
  //   document
  //     .querySelector('.side-menu')
  //     .setAttribute('style', `width:${parWidth}px!important`);
  // }

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
    let budgetNameList = ['Book1', 'Book2', 'Book3', 'Book4'];
    let categoriesList = [
      '-- Choose a Category --',
      'Groceries',
      'Bills',
      'Food',
      'Other'
    ];
    this.props.setModalContent(
      <TransactionForm
        toggleModal={this.props.toggleModal}
        fetchBudgets={this.props.fetchBudgets}
        fetchTransactions={this.props.fetchTransactions}
        fetchUser={this.fetchUser}
        budgets={this.props.budgets}
        budgetNameList={budgetNameList}
        categoriesList={categoriesList}
      />
    );
    this.props.toggleModal();
  };

  updateFinancialStatus = transactions => {
    const category = new Set(['Cash Deposit', 'Direct Deposit', 'ATM Deposit'])
    const today  = new Date();
    let spending = 0;
    let income   = 0;
    
    if (transactions.length) {
      for (let transaction of transactions) {
        const isSameMonth = moment(transaction.createdAt).isSame(today, 'year') &&
                            moment(transaction.createdAt).isSame(today, 'month');

        if (isSameMonth) {
          category.has(transaction.category)
            ? income += transaction.cost
            : spending += transaction.cost;
        }
        this.setState({ spending, income });
      }
    }
  }
}

export default SideMenu;
