import React from 'react';
import './Report.css';
import ReportList from '../../components/ReportList/ReportList';
import BarChart from '../../components/BarChart/BarChart';

class Chart extends React.Component {
  state = {
    reportToRedener: '',
  }

  renderReportEvent = (e) => {
    this.setState({reportToRedener: e.target.value});
  };

  renderClickedReport = () => {
    if (this.state.reportToRedener === 'All-Items-Purchased-By-Date') {
      return <BarChart />;
    }
  }

  render () {
    console.error(this.state.reportToRedener);
    return (
      <div className="Report container-fluid">
        <h2>Report</h2>
        <div className="row">
          <div className="col-sm-4">
            <ReportList
              renderReportEvent={this.renderReportEvent}
            />
          </div>
          <div className="col-sm-7 col-sm-offset-1">
            {this.renderClickedReport()}
          </div>
        </div>
      </div>
    );
  };
};

export default Chart;
