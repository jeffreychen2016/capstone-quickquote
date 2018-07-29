import React from 'react';
import './ReportList.css';
import { ButtonToolbar, Button } from 'react-bootstrap';

class ReportList extends React.Component {
  render () {
    return (
      <div className='ReportList'>
        <h2>Report List</h2>
        <div className="report-list-container">
          <ButtonToolbar className="no-margin-left">
            <Button bsStyle="default" bsSize="large" className="no-margin-left" block>
              Report - All Items Purchased By Date
            </Button>
            <Button bsStyle="default" bsSize="large" className="no-margin-left" block>
              Large button
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default ReportList;
