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
    if (this.state.reportToRedener === 'Total-Purchase-Of-The-Year') {
      return <BarChart />;
    } else {
      return null;
    }
  }

  render () {
    return (
      <div className="Report container-fluid">
        <h1>Report</h1>
        <div className="row">
          <div className="col-sm-4">
            <ReportList
              renderReportEvent={this.renderReportEvent}
            />
          </div>
          <div className="col-sm-8">
            {this.renderClickedReport()}
          </div>
        </div>
      </div>
    );
  };
};

export default Chart;
