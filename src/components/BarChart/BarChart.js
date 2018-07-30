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
    input: '2018',
    janData: [],
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
          data: [12,12,13,14,15,16,20],
        },
      ],
    },
  }

  componentDidMount () {
    const orderFlag = authRequests.getUserId() + '-' + '1';
    orderRequests.getAllOrders(orderFlag)
      .then((allSalesOrders) => {
        allSalesOrders.map((order) => {
          const year = moment(order.date).year();
          const month = moment(order.date).month() + 1;
          orderItemRequests.getAllOrderItemsForGivenOrderNumber(order.id)
            .then((soitems) => {
              soitems.map((soitem) => {
                itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
                  .then((items) => {
                    items.map((item) => {
                      const mergedData = {
                        year,
                        month,
                        item: item.code,
                        quantity: soitem.quantity,
                        price: item.price,
                        total: (soitem.quantity * 1) * item.price,
                      };
                      console.error(mergedData);
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

  test = () => {
    const janData = [1];
    this.setState({janData});
  };

  // processData = (mergedData) => {
  //   // console.error(mergedData);

  //   if (mergedData.year === 2018 && mergedData.month === 1) {
  //     const tempJanData = [...this.state.janData];
  //     console.error(tempJanData);

  //     tempJanData.push(mergedData.total);

  //     const tempJanTotal = tempJanData.reduce((a, b) => {
  //       return a + b;
  //     },0);
  //     // console.error(tempJanTotal);
  //     this.setState({janData: tempJanTotal});
  //   }
  // }

  // processData = (mergedData) => {
  //   const mergedDataArray = [];
  //   const dataForReport = [];
  //   const januaryData = [];
  //   const februaryData = [];

  //   mergedDataArray.push(mergedData);

  //   if (mergedDataArray) {
  //     mergedDataArray.map((mergedData) => {
  //       if (mergedData.year === 2018) {
  //         if (mergedData.month === 1) {
  //           januaryData.push(mergedData.quantity * mergedData.price);
  //           console.error(januaryData);
  //         } else if (mergedData.month === 2) {
  //           februaryData.push(mergedData.quantity * mergedData.price);
  //         }
  //       }
  //     });
  //   }

  //   console.error('test:',januaryData);

  //   const janAmount = januaryData.reduce((a, b) => {
  //     return a + b;
  //   },0);

  //   const febAmount = februaryData.reduce((a, b) => {
  //     return a + b;
  //   },0);

  //   dataForReport.push(janAmount);
  //   dataForReport.push(febAmount);

  //   const tempDatasets = [...this.state.data.datasets];
  //   const tempData = {...this.state.data};
  //   tempDatasets.data = dataForReport;
  //   tempData.datasets = tempDatasets;
  //   this.setState({data: tempData});

  // }

  render () {
    console.error(this.state.janData);
    return (
      <div className='BarChart'>
        <h2>Bar Chart</h2>
        <label htmlFor="input-year">Year:</label>
        <input type="text" id="input-year" placeholder="Example: 2018"/>
        <Bar
          data={this.state.data}
        />
      </div>
    );
  }
}

export default BarChart;
