import React from 'react';
import './BarChart.css';
import {Bar} from 'react-chartjs-2';
import orderRequests from '../../firebaseRequests/order';
import itemRequests from '../../firebaseRequests/item';
import orderItemRequests from '../../firebaseRequests/orderItem';
import authRequests from '../../firebaseRequests/auth';
import moment from 'moment';

class BarChart extends React.Component {
  state = {
    mergedData: [],
    input: '',
    janData: [],
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'monthly purchase',
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
    const orderFlag = `${authRequests.getUserId()}-1`;
    orderRequests.getAllOrders(orderFlag)
      .then((allSalesOrders) => {
        allSalesOrders.forEach((order) => {
          const year = moment(order.date).year();
          const month = moment(order.date).month() + 1;
          orderItemRequests.getAllOrderItemsForGivenOrderNumber(order.id)
            .then((soitems) => {
              soitems.forEach((soitem) => {
                itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
                  .then((items) => {
                    items.forEach((item) => {
                      const mergedData = {
                        year,
                        month,
                        item: item.code,
                        quantity: soitem.quantity,
                        price: item.price,
                        total: (soitem.quantity * 1) * item.price,
                      };
                      this.state.mergedData.push(mergedData);
                    });
                  });
              });
            });
        });
      })
      .catch((err) => {
        console.error('Error getting all orders:', err);
      });
  };

  getValue = (e) => {
    this.setState({input: e.target.value});
  };

  renderDataInChart = (e) => {
    if (e.key === 'Enter') {
      const monthTotal = [];

      const janData = [];
      const febData = [];
      const marData = [];
      const aprData = [];
      const mayData = [];
      const junData = [];
      const julData = [];
      const augData = [];
      const sepData = [];
      const octData = [];
      const novData = [];
      const decData = [];

      let janTotal = 0;
      let febTotal = 0;
      let marTotal = 0;
      let aprTotal = 0;
      let mayTotal = 0;
      let junTotal = 0;
      let julTotal = 0;
      let augTotal = 0;
      let sepTotal = 0;
      let octTotal = 0;
      let novTotal = 0;
      let decTotal = 0;
      this.state.mergedData.forEach((data) => {
        if (data.year  === e.target.value * 1 && data.month === 1) {
          janData.push(data.total);
          janTotal = janData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 2) {
          febData.push(data.total);
          febTotal = febData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 3) {
          marData.push(data.total);
          marTotal = marData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 4) {
          aprData.push(data.total);
          aprTotal = aprData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 5) {
          mayData.push(data.total);
          mayTotal = mayData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 6) {
          junData.push(data.total);
          junTotal = junData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 7) {
          julData.push(data.total);
          julTotal = julData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 8) {
          augData.push(data.total);
          augTotal = augData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 9) {
          sepData.push(data.total);
          sepTotal = sepData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 10) {
          octData.push(data.total);
          octTotal = octData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 11) {
          novData.push(data.total);
          novTotal = novData.reduce((a,b) => {
            return a + b;
          });
        } else if (data.year === e.target.value * 1 && data.month === 12) {
          decData.push(data.total);
          decTotal = decData.reduce((a,b) => {
            return a + b;
          });
        };
      });
      monthTotal.push(janTotal);
      monthTotal.push(febTotal);
      monthTotal.push(marTotal);
      monthTotal.push(aprTotal);
      monthTotal.push(mayTotal);
      monthTotal.push(junTotal);
      monthTotal.push(julTotal);
      monthTotal.push(augTotal);
      monthTotal.push(sepTotal);
      monthTotal.push(octTotal);
      monthTotal.push(novTotal);
      monthTotal.push(decTotal);

      const tempDatasets = [...this.state.data.datasets];
      const tempData = {...this.state.data};
      tempDatasets[0].data = monthTotal;
      tempData.datasets = tempDatasets;
      this.setState({data: tempData});
    };
  };

  render () {
    return (
      <div className='BarChart'>
        <h2>Monthly Purchase Chart</h2>
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
