import React from 'react';
import './MyOrder.css';
import { Table } from 'react-bootstrap';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';
import itemRequests from '../../firebaseRequests/item';
import orderItemRequests from '../../firebaseRequests/orderItem';
import formatPrice from '../../helpers';

class MyOrder extends React.Component {
  state = {
    orders: [],
    radionButtonClicked: '0',
  }

  componentDidMount () {
    this.getAllEstimates();
  };

  getAllEstimates = () => {
    const orderFlag = `${authRequests.getUserId()}-0`;
    orderRequests.getAllOrders(orderFlag)
      .then((allEstimates) => {
        this.setState({ orders: allEstimates });
        this.calculateOrderTotal();
      })
      .catch((err) => {
        console.error('Error with getting all estimates:', err);
      });
  };

  getAllSalesOrders = () => {
    const orderFlag = `${authRequests.getUserId()}-1`;
    orderRequests.getAllOrders(orderFlag)
      .then((allSalesOrders) => {
        this.setState({ orders: allSalesOrders });
        this.calculateOrderTotal();
      })
      .catch((err) => {
        console.error('Error with getting all sales orders:', err);
      });
  };

  calculateOrderTotal = () => {
    this.state.orders.forEach((order, i) => {
      const rowTotals = [];
      let orderTotal = 0;
      orderItemRequests.getAllOrderItemsForGivenOrderNumber(order.id)
        .then((soitems) => {
          soitems.forEach((soitem) => {
            itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
              .then((item) => {
                const rowTotal = item[0].price * (soitem.quantity * 1);
                rowTotals.push(rowTotal);
                orderTotal = rowTotals.reduce((a, b) => {
                  return a + b;
                });
                // assigning total to the orders in state
                const tempOrders = [...this.state.orders];
                tempOrders[i].total = orderTotal;
                this.setState({orders: tempOrders});
              });
          });
        })
        .catch((err) => {
          console.error('Error with getting all soitems:', err);
        });
    });
  };

  // row.id will return firebase id
  renderSelectedOrders = () => {
    const allMyOrdersComponent = this.state.orders.map((order, i) => {
      const viewDetailClickEvent = () => {
        this.props.history.push(`/orderdetail/${order.id}/${this.state.radionButtonClicked}`);
      };
      return (
        <tr key={i}>
          <td>{order.id}</td>
          <td>{order.date}</td>
          <td>{order.total ? formatPrice(order.total) : null}</td>
          {
            this.state.radionButtonClicked === '0' ? (
              <td>
                <button
                  data-deleteorder={order.id}
                  onClick={this.deleteOrder}
                  className="btn btn-danger"
                >Delete</button>
                <button 
                  onClick={viewDetailClickEvent}
                  className="btn btn-info"
                >View</button>
                <button
                  data-updateorder={order.id}
                  onClick={this.placeOrder}
                  className="btn btn-success"
                >Place Order</button>
              </td>
            ) : (
              <td>
                <button 
                  onClick={viewDetailClickEvent}
                  className="btn btn-info"
                >View</button>
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
    this.setState({ radionButtonClicked: e.target.value });
    this.state.radionButtonClicked === '1' ? (this.getAllEstimates()) : (this.getAllSalesOrders());
  }

  // in order to delete all 3 collections
  // need to get the id for each record back first
  // then delete the record based on the returned id
  deleteOrder = (e) => {
    const orderId = e.target.dataset.deleteorder;
    orderRequests.deleteOrder(orderId)
      .then(() => {
        orderItemRequests.getAllOrderItemsForGivenOrderNumber(orderId)
          .then((soitems) => {
            soitems.forEach((soitem) => {
              orderItemRequests.deleteOrderItems(soitem.id)
                .then(() => {
                  itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
                    .then((items) => {
                      items.forEach((item) => {
                        itemRequests.deleteItems(item.id)
                          .then(() => {
                            this.getAllEstimates();
                          });
                      });
                    });
                });
            });
          });
      })
      .catch((err) => {
        console.error('Error deleting order:', err);
      });
  };

  // for the object thats needs for put request
  // have tup update isOrder key as well as orderFlag
  // becuase firebase does not take in two order by parameters
  placeOrder = (e) => {
    this.state.orders.forEach((order, i) => {
      const orderId = e.target.dataset.updateorder;
      if (order.id === orderId) {
        const tempOrder = { ...order };
        tempOrder.isOrder = 1;
        tempOrder.orderFlag = tempOrder.orderFlag.slice(0, -1) + '1';
        orderRequests.updateOrderStatus(orderId, tempOrder)
          .then(() => {
            this.getAllEstimates();
          })
          .catch((err) => {
            console.error('Error updating the order status:', err);
          });
      };
    });
  }

  render () {
    return (
      <div className="MyOrder container-fluid">
        <h1>My Order</h1>
        <div className="row">
          <div className="col-sm-6">
            <div className="input-group">
              <span className="input-group-addon">
                <input
                  type="radio"
                  value="0"
                  checked={this.state.radionButtonClicked === '0'}
                  onChange={this.updateRadioButtonState}
                /> My Estimates
              </span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <span className="input-group-addon">
                <input
                  type="radio"
                  value="1"
                  checked={this.state.radionButtonClicked === '1'}
                  onChange={this.updateRadioButtonState}
                /> My Orders
              </span>
            </div>
          </div>
        </div>
        <div className="row">
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
      </div>
    );
  };
};

export default MyOrder;
