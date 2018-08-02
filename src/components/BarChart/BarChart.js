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
    input: '',
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
    const orderFlag = authRequests.getUserId() + '-' + '1';
    this.getData();
  };

  getData = () => {
    const userId = authRequests.getUserId();

    const rootRef = firebase.database().ref();
    const soRef = rootRef.child('so').orderByChild('orderFlag').startAt(userId);
    soRef.on('value',(snapshot) => {
      const salesOrders = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).forEach(fbKey => {
          snapshot.val()[fbKey].id = fbKey;
          salesOrders.push(snapshot.val()[fbKey]);
        });
      }
    console.error(salesOrders);
    });
  };

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
