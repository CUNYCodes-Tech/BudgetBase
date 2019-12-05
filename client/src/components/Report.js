import React from 'react';
import moment from 'moment';

import '../Report.css';
import SideNav from './SideNav';
import ExpenseDonut from './ExpenseDonut';
import MoneyDonut from './MoneyDonut';
import StackedBars from './StackedBars';
import EarnedIcon from '../assets/img/earned-Icon.svg';
import SpentIcon from '../assets/img/spent-icon.svg';
import GrowthIcon from '../assets/img/growth-icon.svg';

class Report extends React.Component {
  state = { expenseData: {}, moneyData: {}, stackedData: [], totalEarned: 0, totalSpent: 0, totalSaved: 0 };

  async componentDidMount() {
    await this.fetchExpenses();
    new ExpenseDonut(this.refs.expenseDonut, this.state.expenseData);
    new MoneyDonut(this.refs.moneyDonut, this.state.moneyData);
    new StackedBars(this.refs.stackedBars, this.state.stackData);
  }

  render() {
    return (
        <>
          <div className="row">
            <div className="col s12 m1 side-nav-container hide-on-med-and-down">
              <SideNav />
            </div>
            <div className="vis-container col s12 m11">
              {/* First Row: mini charts */}
              <div className="row">
                <div className="col s12 m4" style={{ padding: "1rem 1rem" }}>
                  <div className="chart-container z-depth-1">
                    <div>Expenses Distribution</div>
                    <div className="mini-chart" ref="expenseDonut"></div>
                  </div>
                </div>
                <div className="col s12 m4" style={{ padding: "1rem 1rem" }}>
                  <div className="chart-container z-depth-1">
                    <div>Money</div>
                    <div className="mini-chart" ref="moneyDonut"></div>
                  </div>
                </div>
                <div className="col s12 m4" style={{ padding: "1rem 1rem" }}>
                  <div className="chart-container z-depth-1">
                    <div>Stacked Bar Chart</div>
                    <div className="mini-chart" ref="stackedBars"></div>
                  </div>
                </div>
                {/* Second row: stats */}
                <div className="row">
                  <div className="col s12 m12 stat-container">
                    <div className="stat z-depth-1">
                      <div className="row" style={{ height: "100%" }}>
                        <div className="col s12 m2 valign-wrapper" style={{ height: "100%" }}>
                          <img src={EarnedIcon} />
                        </div>
                        <div className="col s12 m10 valign-wrapper" style={{ height: "100%" }}>
                          <div className="stat-wrapper">
                            <div style={{ color: "#56d9fe" }}>${this.state.totalEarned.toLocaleString()}</div>
                            <div>Total Earned</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="stat z-depth-1">
                      <div className="row" style={{ height: "100%" }}>
                        <div className="col s12 m2 valign-wrapper" style={{ height: "100%" }}>
                          <img src={SpentIcon} />
                        </div>
                        <div className="col s12 m10 valign-wrapper" style={{ height: "100%" }}>
                          <div className="stat-wrapper">
                            <div style={{ color: "#adaafb" }}>${this.state.totalSpent.toLocaleString()}</div>
                            <div>Spent</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="stat z-depth-1">
                      <div className="row" style={{ height: "100%" }}>
                        <div className="col s12 m2 valign-wrapper" style={{ height: "100%" }}>
                          <img src={GrowthIcon} />
                        </div>
                        <div className="col s12 m10 valign-wrapper" style={{ height: "100%" }}>
                          <div className="stat-wrapper">
                            <div style={{ color: "#85e5b4" }}>+${this.state.totalSaved.toLocaleString()}</div>
                            <div>Saved</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
  }

  fetchExpenses = async () => {
    const response = await fetch('/api/transaction/all', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    const data = await response.json();

    let expenses = { Groceries: 0, Bills: 0, Food: 0, Other: 0 };
    let money = { Spent: 0, Saved: 0 };
    let stack = {};

    // Initialize stack data.
    const stackKeys = ["Saved", "Earned", "Spent"];
    for (let i = 0; i < stackKeys.length; ++i) {
      for (let j = 1; j <= 5; ++j) {
        stack[stackKeys[i] + j] = {
          symbol: stackKeys[i],
          date: "Week " + j,
          price: 0
        }
      }
    }
    
    const nonRelated = new Set(["Cash Deposit", "Direct Deposit", "ATM Deposit"]);
    let earned = 0;
    let spent = 0;
    let saved = 0;
    for (let d of data) {
      const isThisMonth = moment(d.createdAt).isSame(new Date(), 'month');
      const weekNumber = Math.ceil(moment(d.createdAt).date() / 7);
      

      if (expenses.hasOwnProperty(d.category)) {
        expenses[d.category] += d.cost;
      } else if (money.hasOwnProperty(d.category)) {
        money[d.category] += d.cost;
      }

      // Populate stack.
      if (isThisMonth) {
        switch(d.category) {
          case "Groceries":
          case "Bills":
          case "Food":
          case "Other":
          case "Spent":
            stack["Spent" + weekNumber].price += d.cost;
            spent += d.cost;
            break;
          case "Saved":
            stack["Saved" + weekNumber].price += d.cost;
            saved += d.cost;
            break;
          case "Cash Deposit":
            // stack["Earned" + weekNumber].price+= d.cost;
            // break;
          case "Direct Deposit":
            // stack["Earned" + weekNumber].price+= d.cost;
            // break;
          case "ATM Deposit":
            stack["Earned" + weekNumber].price+= d.cost;
            earned += d.cost;
            break;
          default:
            break;
        }
      }
    }
    
    this.setState({ expenseData: expenses });
    this.setState({ moneyData: money });
    this.setState({ stackData: Object.values(stack) });
    this.setState({ totalEarned: earned, totalSaved: saved, totalSpent: spent });
  }
}

export default Report;