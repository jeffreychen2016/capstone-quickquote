import React from 'react';
import './Report.css';
import ReportList from '../../components/ReportList/ReportList';
import BarChart from '../../components/BarChart/BarChart';

class Chart extends React.Component {
  render () {
    return (
      <div className="Report">
        <h2>Report</h2>
        <ReportList />
        <BarChart />
      </div>
    );
  };
};

export default Chart;
