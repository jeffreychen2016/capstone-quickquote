import React from 'react';
import './MyOrder.css';
import { Table } from 'react-bootstrap';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';

class MyOrder extends React.Component {
  state = {
    allEstimates: [],
  }

  componentDidMount () {
    this.getAllEstimates();
  };

  getAllEstimates = () => {
    const orderFlag = authRequests.getUserId() + '-' + '0';
    orderRequests.getAllOrders(orderFlag)
      .then((allEstimates) => {
        this.setState({ allEstimates });
      })
      .catch((err) => {
        console.error('Error with getting all estimates:', err);
      });
  };

  getAllSalesOrders = () => {
    const orderFlag = authRequests.getUserId() + '-' + '1';
    orderRequests.getAllOrders(orderFlag)
      .then((allEstimates) => {
        this.setState({ allEstimates });
      })
      .catch((err) => {
        console.error('Error with getting all sales orders:', err);
      });
  };

  // loop through each order first
  // then loop through each array which contains order rows
  // then add row amount together
  calculateOrderTotal = (row) => {
    return row.items.reduce((a, b) => {
      return a + b.amount;
    },0);
  };

  // row.id will return firebase id
  render () {
    const allEstimateComponent = this.state.allEstimates.map((row, i) => {
      return (
        <tr key={i}>
          <td>ES{row.id}</td>
          <td>{row.date}</td>
          <td>{this.calculateOrderTotal(row)}</td>
          <td>
            <button>Delete</button>
            <button>Place Order</button>
          </td>
        </tr>
      );
    });
    return (
      <div className="MyOrder">
        <h2>MyOrder</h2>
        <input type="radio" name="gender" value="male" defaultChecked /> My Estimates
        <input type="radio" name="gender" value="female" /> My Orders
        <Table responsive id="order-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date Created</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allEstimateComponent}
          </tbody>
        </Table>
      </div>
    );
  };
};

export default MyOrder;
