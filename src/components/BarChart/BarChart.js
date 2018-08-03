import React from 'react';
import './BarChart.css';
import {Bar} from 'react-chartjs-2';
import orderRequests from '../../firebaseRequests/order';
import itemRequests from '../../firebaseRequests/item';
import orderItemRequests from '../../firebaseRequests/orderItem';
import authRequests from '../../firebaseRequests/auth';
import firebase, { firestore } from 'firebase';
import moment from 'moment';

class BarChart extends React.Component {
  state = {
    mergedData: [],
    input: 2018,
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'Total-Purchase-Of-The-Year',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [],
        },
      ],
    },
  }

  componentDidMount () {
    this.getUserSOData();
  };

  // get all so (1) data for the user
  getUserSOData = () => {
    const userId = authRequests.getUserId();
    const orderFlag = userId + '-1';

    const rootRef = firebase.database().ref();
    const soRef = rootRef.child('so').orderByChild('orderFlag').startAt(orderFlag);
    soRef.on('value',(snapshot) => {
      const salesOrders = [];
      const returnedValue = snapshot.val();
      if (returnedValue !== null) {
        Object.keys(returnedValue).forEach(fbKey => {
          returnedValue[fbKey].id = fbKey;
          salesOrders.push(returnedValue[fbKey]);
        });
      }
      this.getOneYearSOData(salesOrders);
    });
  };

  getOneYearSOData = (allData) => {
    const yearToSearch = this.state.input;
    const oneYearSO = allData.filter((so) => {
      return moment(so.date).year() === yearToSearch;
    });
    this.getOneYearSOItemData(oneYearSO);
  };

  getOneYearSOItemData = (oneYearData) => {
    console.error('oneYearData',oneYearData);
    const rootRef = firebase.database().ref();
    const soitemRef = rootRef.child('soitem').child('1');
    const soitems = [];
    const allMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
    oneYearData.map((so) => {
      if ((moment(so.date).month() + 1) === 8) {
        // soitems[0].push();
        console.error('so',soitemRef);

      }
    });
  }

  getValue = (e) => {
    this.setState({input: e.target.value});
  };

  renderDataInChart = () => {
    this.getData();
  }

  render () {
    return (
      <div className='BarChart'>
        <h2>Bar Chart</h2>
        <label htmlFor="input-year">Year:</label>
        <input
          type="text"
          id="input-year"
          placeholder="Example: 2018"
          value={this.state.input}
          onChange={this.getValue}
          onKeyPress={this.renderDataInChart}
        />
        <Bar
          data={this.state.data}
        />
      </div>
    );
  }
}

export default BarChart;
