import React, {Component} from 'react';
import PieChart from 'react-minimal-pie-chart';

class Reports extends React.Component {
  render() {
    return (
      <div className="center reports-container">
            <h1>Reports</h1>
          <PieChart data={[
       
             { title: 'Eating Out', value: 10, color: '#E38627' },
             { title: 'Fuel', value: 15, color: '#C13C37' },
             { title: 'General', value: 30, color: '#6A2135' },
             { title: 'Holidays', value: 10, color: 'green' },
             { title: 'Travel', value: 20, color: 'yellow' }
            ]} />
                            
      </div>
    );
  }
}

export default Reports;