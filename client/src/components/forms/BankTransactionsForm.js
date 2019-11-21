import React from 'react';

class BankTransactionsForm extends React.Component {
  state = { bankTransactions: [], selectedTransactions: {} }

  componentDidMount() {
    this.fetchBankTransactions(this.props.bankAccounts);
  }

  render() {
    return (
      <>
        <div>Select transactions from your bank account to add.</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
        {
          this.state.bankTransactions.length
          ? this.state.bankTransactions.map(item => {
            return (
              <tr key={item.transaction_id} id={item.transaction_id} onClick={this.handleClick}>
                <td>{item.name}</td>
                <td>{item.category[0]}</td>
                <td>${item.amount}</td>
                <td>{item.date}</td>
              </tr>
            )
          })
          : null
        }
          </tbody>
        </table>
        <button className="btn" onClick={this.handleSubmit}>Add</button>
      </>
    );
  }

  handleSubmit = async () => {
    for (let key in this.state.selectedTransactions) {
      await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(this.state.selectedTransactions[key])
      });
    }
    this.props.fetchTransactions();
    this.props.toggleModal();
  }

  handleClick = e => {
    const element = e.target.parentElement;
    if (element.classList.contains("activeRow")) {
      element.classList.remove("activeRow");
      let data = { ...this.state.selectedTransactions };
      delete data[element.id];
      this.setState({ selectedTransactions: data });
    } else {
      element.classList.add("activeRow");
      const data = {
        name: element.childNodes[0].innerText,
        category: element.childNodes[1].innerText,
        cost: element.childNodes[2].innerText.slice(1, element.childNodes[2].innerText.length),
        createdAt: element.childNodes[3].innerText,
        budgetId: null,
        paymentType: 'cash'
      };
      this.setState({ selectedTransactions: {...this.state.selectedTransactions, [element.id]: data } })
    }
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