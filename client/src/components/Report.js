import React from 'react';

import SideNav from './SideNav';

class Report extends React.Component {
  render() {
    return (
        <>
          <div className="row">
            <div className="col s12 m1 side-nav-container hide-on-med-and-down">
              <SideNav />
            </div>
          </div>
        </>
    );
  }
}

export default Report;