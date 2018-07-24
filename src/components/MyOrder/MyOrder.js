import React from 'react';
import './MyOrder.css';
import { Table } from 'react-bootstrap';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';

class MyOrder extends React.Component {
  state = {
    orders: [],
    radionButtonClicked: '0',
  }

  componentDidMount () {
    this.getAllEstimates();
  };

  getAllEstimates = () => {
    const orderFlag = authRequests.getUserId() + '-' + '0';
    orderRequests.getAllOrders(orderFlag)
      .then((allEstimates) => {
        this.setState({ orders : allEstimates });
      })
      .catch((err) => {
        console.error('Error with getting all estimates:', err);
      });
  };

  getAllSalesOrders = () => {
    const orderFlag = authRequests.getUserId() + '-' + '1';
    orderRequests.getAllOrders(orderFlag)
      .then((allSalesOrders) => {
        this.setState({ orders : allSalesOrders });
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
  renderSelectedOrders = () => {
    const allMyOrdersComponent = this.state.orders.map((row, i) => {
      return (
        <tr key={i}>
          <td>ES{row.id}</td>
          <td>{row.date}</td>
          <td>{this.calculateOrderTotal(row)}</td>
          {
            this.state.radionButtonClicked === '0' ? (
              <td>
                <button
                  data-deleteOrder={row.id}
                  onClick={this.deleteOrder}
                >Delete</button>
                <button>View</button>
                <button
                  data-updateOrder={"update-" + row.id}
                  onClick={this.placeOrder}
                >Place Order</button>
              </td>
            ) : (
              <td>
                <button>View</button>
              </td>
            )
          }
        </tr>
      );
    });
    return allMyOrdersComponent;
  }

  // based on the button selected, the orders array will be updated.
  // if My Esistamtes is selected, the orders array in the state will be reset to contain all estimates
  updateRadioButtonState = (e) => {
    this.setState({radionButtonClicked: e.target.value});
    this.state.radionButtonClicked === '1' ? (this.getAllEstimates()) : (this.getAllSalesOrders());
  }

  deleteOrder = (e) => {
    const orderId = e.target.dataset.deleteOrder;
    orderRequests.deleteOrder(orderId)
      .then(() => {
        this.getAllEstimates();
      })
      .catch((err) => {
        console.error('Error deleting order:',err);
      });
  };

  placeOrder = (e) => {
    this.state.orders.map((order, i) => {
      const orderId = '-' + e.target.id.split('-').pop();
      if (order.id === orderId) {
        const tempOrder = {...order};
        tempOrder.isOrder = 1;
        console.error(tempOrder);
        orderRequests.updateOrderStatus(orderId,tempOrder)
          .then(() => {
            console.error('updated');
          })
          .catch((err) => {
            console.error('Error updating the order status:',err);
          });
      };
    });
  }

  render () {
    console.error(this.state.orders);
    return (
      <div className="MyOrder">
        <h2>MyOrder</h2>
        <input
          type="radio"
          value="0"
          checked={this.state.radionButtonClicked === '0'}
          onChange={this.updateRadioButtonState}
        /> My Estimates
        <input
          type="radio"
          value="1"
          checked={this.state.radionButtonClicked === '1'}
          onChange={this.updateRadioButtonState}
        /> My Orders
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
            {this.renderSelectedOrders()}
          </tbody>
        </Table>
      </div>
    );
  };
};

export default MyOrder;
