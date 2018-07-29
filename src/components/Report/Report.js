import React from 'react';
import './Report.css';
import ReportList from '../../components/ReportList/ReportList';
import BarChart from '../../components/BarChart/BarChart';

class Chart extends React.Component {
  render () {
    return (
      <div className="Report container-fluid">
        <h2>Report</h2>
        <div className="row">
          <div className="col-sm-4">
            <ReportList />
          </div>
          <div className="col-sm-7 col-sm-offset-1">
            <BarChart />
          </div>
        </div>
      </div>
    );
  };
};

export default Chart;
