import React from 'react';

class BankTransactionsForm extends React.Component {
  state = { bankTransactions: [] }

  componentDidMount() {
    this.fetchBankTransactions(this.props.bankAccounts);
  }

  render() {
    return (
      <>
        <div>Bank Transactions</div>
        {
          this.state.bankTransactions.length
          ? this.state.bankTransactions.map(item => {
            return (
              <div>
                <span>{item.name}</span>
                <span>${item.amount}</span>
              </div>
            )
          })
          : null
        }
      </>
    );
  }

  fetchBankTransactions = async accounts => {
    const response = await fetch('/api/plaid/accounts/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify({ accounts: accounts })
    });
    const data = await response.json();
    this.setState({ bankTransactions: data[0].transactions });
  }
}

export default BankTransactionsForm;