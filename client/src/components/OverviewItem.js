import React from 'react';

class OverviewItem extends React.Component {
  componentWillReceiveProps({ earn, spend, id }) {
    const percent = earn / (spend + earn) * 100;
    document.querySelector(`.overview-progress-${id}`).setAttribute('style', `width: ${percent}%; height: 100%; border-radius: inherit; background: #1de9b6;`);
  }

  render() {
    return (
      <div className="col s12">
        <div className="overview-item-container">
          <div className="overview-item-amount">
            <span>{this.props.spend <= this.props.earn? '+ ' : '- '}</span>
            <span>${Math.abs(this.props.earn - this.props.spend)}</span>
          </div>
          <div className="overview-progress">
            <div className={`overview-progress-${this.props.id}`}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewItem;