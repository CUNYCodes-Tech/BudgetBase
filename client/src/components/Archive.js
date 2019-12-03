import React from 'react';




class Archive extends React.Component {
  fetchTransactions = async () => {
    const response = await fetch(`/api/transactions/archive`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const data = await response.json();
    this.setState({ transactions: data });
  }  
  render() {
    return (
        <div className = "center">
            Archive
            <ActivityMenu
                  fetchBalance={this.fetchBalance}
                  fetchTransactions={this.fetchTransactions}
                  balance={this.state.balance}
                  transactions={this.state.transactions}
                  token={this.props.token}
                  showModal={this.state.showModal}
                  toggleModal={this.toggleModal}
                  setModalContent={this.setModalContent}
                  setModalTitle={this.setModalTitle}
              />
        </div>
    );
  }
}

export default Archive;