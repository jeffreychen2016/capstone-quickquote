import React from 'react';
import './MyOrder.css';
import { Table } from 'react-bootstrap';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';
import itemRequests from '../../firebaseRequests/item';
import orderItemRequests from '../../firebaseRequests/orderItem';

class MyOrder extends React.Component {
  state = {
    orders: [],
    radionButtonClicked: '0',
    orderTotal: 0,
  }

  componentDidMount () {
    this.getAllEstimates();
  };

  getAllEstimates = () => {
    const orderFlag = authRequests.getUserId() + '-' + '0';
    orderRequests.getAllOrders(orderFlag)
      .then((allEstimates) => {
        this.setState({ orders: allEstimates });
      })
      .catch((err) => {
        console.error('Error with getting all estimates:', err);
      });
  };

  getAllSalesOrders = () => {
    const orderFlag = authRequests.getUserId() + '-' + '1';
    orderRequests.getAllOrders(orderFlag)
      .then((allSalesOrders) => {
        this.setState({ orders: allSalesOrders });
      })
      .catch((err) => {
        console.error('Error with getting all sales orders:', err);
      });
  };

  // calculateOrderTotal = (row) => {
  //   const total = new Promise((resolve,reject) => {
  //     const rowTotals = [];
  //     orderItemRequests.getAllOrderItemsForGivenOrderNumber(row.id)
  //       .then((soitems) => {
  //         soitems.map((soitem) => {
  //           itemRequests.getAllOrderItemsBasedOnItemId(soitem.itemid)
  //             .then((item) => {
  //               const rowTotal = item.price * soitem.quantity;
  //               rowTotals.push(rowTotal);
  //               rowTotals.reduce((a, b) => {
  //                 resolve(a + b);
  //               });
  //             });
  //         });
  //       })
  //       .catch((err) => {
  //         console.error('Error with getting all soitems:', err);
  //       });
  //   });
  //   total
  //     .then((orderTotal) => {
  //       this.setState({orderTotal});
  //     });
  // };

  test = () => {
    return '1';
  }

  // row.id will return firebase id
  renderSelectedOrders = () => {
    const allMyOrdersComponent = this.state.orders.map((row, i) => {
      const viewDetailClickEvent = () => {
        console.error(row.id);
        this.props.history.push(`/orderdetail/${row.id}`);
      };
      return (
        <tr key={i}>
          <td>ES{row.id}</td>
          <td>{row.date}</td>
          <td></td>
          {/* <td>{this.state.orderTotal}</td> */}
          {/* <td>{this.test()}</td> */}

          {
            this.state.radionButtonClicked === '0' ? (
              <td>
                <button
                  data-deleteorder={row.id}
                  onClick={this.deleteOrder}
                >Delete</button>
                <button onClick={viewDetailClickEvent}>View</button>
                <button
                  data-updateorder={row.id}
                  onClick={this.placeOrder}
                >Place Order</button>
              </td>
            ) : (
              <td>
                <button onClick={viewDetailClickEvent}>View</button>
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

  // deleteOrder = (e) => {
  //   const orderId = e.target.dataset.deleteorder;
  //   orderRequests.deleteOrder(orderId)
  //     .then(() => {
  //       this.getAllEstimates();
  //     })
  //     .catch((err) => {
  //       console.error('Error deleting order:', err);
  //     });
  // };

  // in order to delete all 3 collections
  // need to get the id for each record back first
  // then delete the record based on the returned id
  deleteOrder = (e) => {
    const orderId = e.target.dataset.deleteorder;
    orderRequests.deleteOrder(orderId)
      .then(() => {
        orderItemRequests.getAllOrderItemsForGivenOrderNumber(orderId)
          .then((soitems) => {
            soitems.map((soitem) => {
              orderItemRequests.deleteOrderItems(soitem.id)
                .then(() => {
                  itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
                    .then((items) => {
                      items.map((item) => {
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
    this.state.orders.map((order, i) => {
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
