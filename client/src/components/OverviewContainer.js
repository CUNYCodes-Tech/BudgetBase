import React from 'react';
import moment from 'moment';

import OverviewItem from './OverviewItem';

class OverviewContainer extends React.Component {
  state = { todaySpend: 0, todayEarn: 0, weekSpend: 0, weekEarn: 0, monthSpend: 0, monthEarn: 0 }

  componentWillReceiveProps({ transactions }) {
    const earn = new Set(['Cash Deposit', 'Direct Deposit', 'ATM Deposit'])
    const today = new Date();
    let todaySpend = 0, todayEarn = 0, weekSpend = 0, weekEarn = 0, monthSpend = 0, monthEarn = 0;
    for (let transaction of transactions) {
      const isToday = moment(transaction.createdAt).isSame(today, 'day');
      const isWeek  = moment(transaction.createdAt).isSame(today, 'week');
      const isMonth = moment(transaction.createdAt).isSame(today, 'month') && moment(transaction.createdAt).isSame(today, 'year');
      if (isToday) earn.has(transaction.category)? todayEarn += transaction.cost : todaySpend += transaction.cost;
      if (isWeek) earn.has(transaction.category)? weekEarn += transaction.cost : weekSpend += transaction.cost;
      if (isMonth) earn.has(transaction.category)? monthEarn += transaction.cost : monthSpend += transaction.cost;
    }
    this.setState({ todaySpend, todayEarn, weekSpend, weekEarn, monthSpend, monthEarn });
  }

  render() {
    return (
      <div className="row overview-container card-panel">
        <div className="overview-item-title">Today</div>
        <OverviewItem id="1" spend={this.state.todaySpend} earn={this.state.todayEarn}  />
        <div className="overview-item-title">This week</div>
        <OverviewItem id="2" spend={this.state.weekSpend} earn={this.state.weekEarn} />
        <div className="overview-item-title">This month</div>
        <OverviewItem id="3" spend={this.state.monthSpend} earn={this.state.monthEarn} />
      </div>
    );
  }
}

export default OverviewContainer;