import React from 'react';

class BankTransactionsForm extends React.Component {
  state = { bankTransactions: [], selectedTransactions: {}, page: 1 }

  componentDidMount() {
    this.fetchBankTransactions(this.props.bankAccounts);
  }

  render() {
    console.log(this.state.selectedTransactions);
    return this.state.page === 1? this.renderPageOne() : this.renderPageTwo();
  }

  renderPageOne = () => (
    <>
      <div>Select transactions from your bank account to add.</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
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
              <td>${item.amount}</td>
              <td>{item.date}</td>
            </tr>
          )
        })
        : null
      }
        </tbody>
      </table>
      <button className="btn" onClick={() => this.setState({ page: this.state.page+1 })}>Next</button>
      {/* <button className="btn" onClick={this.handleSubmit}>Add</button> */}
    </>   
  );

  renderPageTwo = () => (
    <>
      <div>Choose categories and budgets for your selected transactions.</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
      {
        true// this.state.selectedTransactions.length
        ? Object.keys(this.state.selectedTransactions).map((key, idx) => {
          const item = this.state.selectedTransactions[key];
          return (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>${item.cost}</td>
              <td>{item.createdAt}</td>
              <td>
                <select id={key} className="browser-default" onChange={this.handleCategoryChange}>
                  <option value="Groceries">Groceries</option>
                  <option value="Bills">Bills</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td>
                <select id={key} className="browser-default" onChange={this.handleBudgetChange}>
                  <option value={null}>None</option>
                  {
                    this.props.budgets.map(budget => <option value={budget._id}>{budget.name}</option>)
                  }
                </select>
              </td>
            </tr>
          )
        })
        : null
      }
        </tbody>
      </table>
      {/* <button className="btn" onClick={() => this.setState({ page: page+1 })}>Next</button> */}
      <button className="btn" onClick={this.handleSubmit}>Add</button>
    </>
  );

  handleCategoryChange = e => {
    const temp = e.target.id;
    const category = e.target.value;
    this.setState(prevState => ({
      selectedTransactions: {
        ...prevState.selectedTransactions,
        [temp]: { ...this.state.selectedTransactions[temp], category }
      }
    }));
  }

  handleBudgetChange = e => {
    const key = e.target.id;
    const budgetId = e.target.value;
    this.setState(prevState => ({
      selectedTransactions: {
        ...prevState.selectedTransactions,
        [key]: { ...this.state.selectedTransactions[key], budgetId }
      }
    }));
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
    this.props.fetchBudgets();
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
        category: "Groceries",
        cost: element.childNodes[1].innerText.slice(1, element.childNodes[1].innerText.length),
        createdAt: element.childNodes[2].innerText,
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