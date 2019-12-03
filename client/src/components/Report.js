import React from 'react';

import '../Report.css';
import SideNav from './SideNav';
import ExpenseDonut from './ExpenseDonut';
import MoneyDonut from './MoneyDonut';
import StackedBars from './StackedBars';
import EarnedIcon from '../assets/img/earned-Icon.svg';
import SpentIcon from '../assets/img/spent-icon.svg';
import GrowthIcon from '../assets/img/growth-icon.svg';

class Report extends React.Component {
  state = { expenseData: {}, moneyData: {}, stackedData: [] };

  async componentDidMount() {
    await this.fetchExpenses();
    new ExpenseDonut(this.refs.expenseDonut, this.state.expenseData);
    new MoneyDonut(this.refs.moneyDonut);
    new StackedBars(this.refs.stackedBars);
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
                            <div style={{ color: "#56d9fe" }}>$50,000</div>
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
                            <div style={{ color: "#adaafb" }}>$1,250</div>
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
                            <div style={{ color: "#85e5b4" }}>+2.0%</div>
                            <div>Growth</div>
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
    const nonRelated = new Set(["Cash Deposit", "Direct Deposit", "ATM Deposit"]);
    for (let d of data) {
      if (nonRelated.has(d.category)) continue;
      
      if (expenses.hasOwnProperty(d.category)) {
        expenses[d.category] += d.cost;
      }
    }
    this.setState({ expenseData: expenses });
  }
}

export default Report;