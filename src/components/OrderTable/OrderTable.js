import React, { Fragment } from 'react';
import './OrderTable.css';
import { Table } from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import productRequests from '../../firebaseRequests/product';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';
import itemRequests from '../../firebaseRequests/item';
import orderItemRequests from '../../firebaseRequests/orderItem';
import moment from 'moment';

// Note: state should be only used to store varibales
class OrderTable extends React.Component {
  state = {
    products: [],
    onOrder: [
      // {
      //   code: '',
      //   description: '',
      //   quantity: 0,
      //   price: 0,
      //   amount: 0,
      // },
    ],
    soNumber: '',
  }

  componentDidMount() {
    this.getAllProducts();
    this.initializeStateOnOrder();
  };

  getAllProducts = () => {
    productRequests.getProductsRequest()
      .then((products) => {
        this.setState({ products });
      })
      .catch((err) => {
        console.error('Error getting products:', err);
      });
  };

  initializeStateOnOrder = () => {
    if (this.props.componentFrom === 'OrderDetail') {
      const orderNumber = this.props.orderId;
      const items = [];
      orderRequests.getSigngeOrder(orderNumber)
        .then((so) => {
          this.setState({ so });
          orderItemRequests.getAllOrderItemsForGivenOrderNumber(orderNumber)
            .then((soitems) => {
              soitems.map((soitem) => {
                itemRequests.getAllItemsBasedOnItemId(soitem.itemid)
                  .then((item) => {
                    item[0].quantity = soitem.quantity;
                    item[0].amount = soitem.amount;
                    items.push(item[0]);
                    this.setState({ onOrder: items });
                  });
              });
            });
        })
        .catch((err) => {
          console.error('Error with getting single order:', err);
        });
    } else {
      for (let i = 0; i < 10; i++) {
        this.state.onOrder.push(
          {
            code: '',
            description: '',
            quantity: 0,
            price: 0,
            amount: 0,
          });
      };
    }
  };

  matchProductDescription = (selectedOption, id) => {
    const products = this.state.products;
    products.map((product, i) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[id].description = product.description;
        this.setState({ onOrder: tempOnOrder });
      };
    });
  };

  matchProductPrice = (selectedOption, id) => {
    const products = this.state.products;
    products.map((product) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[id].price = product.price;
        this.setState({ onOrder: tempOnOrder });
      };
    });
  }

  updateOnOrderCode = (selectedOption, id) => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].code = selectedOption;
    this.setState({ onOrder: tempOnOrder });
  };

  updateOnOrderQuantity = (e) => {
    // find the row to detect which input box gets changed then update the state accordingly
    // row id starts with 1, but the index in the state state starts with 0, so need to minus 1
    const id = e.target.id.split('-').pop() - 1;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].quantity = e.target.value;
    this.setState({ onOrder: tempOnOrder });

    this.calculateRowTotal(id);
  };

  calculateRowTotal = (id) => {
    const onOrder = this.state.onOrder[id];
    const rowAmount = onOrder.price * onOrder.quantity;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].amount = rowAmount;
    this.setState({ onOrder: tempOnOrder });
  };

  // delete tempOnOrder[i] will still leave "empty" in the array, which will break other codes
  // so user "splice" to remove deleted row
  deleteRow = (e) => {
    const id = e.target.id.split('-').pop() - 1;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder.map((row, i) => {
      i === id ? tempOnOrder.splice(i, 1) : 'nothing';
    });
    this.setState({ onOrder: tempOnOrder });
  }

  addRow = () => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder.push({
      code: '',
      description: '',
      quantity: 0,
      price: 0,
      amount: 0,
    });
    this.setState({ onOrder: tempOnOrder });
  };

  // merge order array, userId, shipToAddress,currentDate obeject, and isOrder together
  // orderFlag (uidIsOrder) is created to be used as index in firebase
  // since firebase does not support multi-parameters query
  constructSOData = (orderStatusCode) => {
    const currentDate = moment().format('YYYY-MM-DD h:m:s a');
    const userId = authRequests.getUserId();
    const uIdIsOrder = userId + '-' + orderStatusCode;

    const so = {
      uid: userId,
      date: currentDate,
      isOrder: orderStatusCode,
      orderFlag: uIdIsOrder,
      shipTo: this.props.shipTo,
    };
    return so;
  };

  // update the isOrder to either 1 or 0
  // merge order with shipping address and user id
  // post to database
  saveAsOrder = () => {
    const soData = this.constructSOData(1);
    orderRequests.postOrder(soData)
      .then((soKey) => {
        const itemsToPost = this.cleanOrderObjectForPosting();
        itemsToPost.map((item) => {
          const tempItem = { ...item };
          delete tempItem.amount;
          delete tempItem.quantity;
          itemRequests.postItem(tempItem)
            .then((itemKey) => {
              const orderItem = { soid: soKey.data.name, itemid: itemKey.data.name, quantity: item.quantity, amount: item.amount };
              orderItemRequests.postOrderItem(orderItem)
                .then(() => {
                  this.props.redirectToMyOrderAfterPost();
                });
            });
        });
      })
      .catch((err) => {
        console.error('Errot with posting order to database:', err);
      });
  };

  // the reason to have tempItem is because when post to orderItem
  // it needs quantity and amount, but item collection itself does not
  // they are in the same loop, if remove in from "item" parameter
  // then time.quantity will not have access to the quantity anymore
  saveAsEstimate = () => {
    const soData = this.constructSOData(0);
    orderRequests.postOrder(soData)
      .then((soKey) => {
        const itemsToPost = this.cleanOrderObjectForPosting();
        itemsToPost.map((item) => {
          const tempItem = { ...item };

          delete tempItem.amount;
          delete tempItem.quantity;
          itemRequests.postItem(tempItem)
            .then((itemKey) => {
              const orderItem = { soid: soKey.data.name, itemid: itemKey.data.name, quantity: item.quantity, amount: item.amount };
              orderItemRequests.postOrderItem(orderItem)
                .then(() => {
                  this.props.redirectToMyOrderAfterPost();
                });
            });
        });
      })
      .catch((err) => {
        console.error('Errot with posting order to database:', err);
      });
  };

  saveChanges = () => {
    const orderId = this.props.orderId;
    // delete all this so related records in soitem and item collection
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
                      });
                  });
                });
            });
        });
      })
      .catch((err) => {
        console.error('Error deleting order:', err);
      });

    // post order table changes
    const itemsToPost = this.cleanOrderObjectForPosting();
    itemsToPost.map((item) => {
      const tempItem = { ...item };
      delete tempItem.amount;
      delete tempItem.quantity;
      delete tempItem.id;
      itemRequests.postItem(tempItem)
        .then((itemKey) => {
          const orderItem = { soid: orderId, itemid: itemKey.data.name, quantity: item.quantity, amount: item.amount };
          orderItemRequests.postOrderItem(orderItem)
            .then(() => {
              this.props.redirectToMyOrderAfterPost();
            });
        })
        .catch((err) => {
          console.error('Error posting changed order:', err);
        });;
    });

    // post update ship to address
    const newShipTo = { ...this.props.shipTo };
    orderRequests.getSigngeOrder(orderId)
      .then((order) => {
        const tempOrder = { ...order };
        tempOrder.shipTo = newShipTo;
        orderRequests.updateOrderShipTo(orderId, tempOrder)
          .then(() => {
            console.error('updated!');
          });
      })
      .catch((err) => {
        console.error('Eorr updating ship to address:',err);
      });
  }

  cleanOrderObjectForPosting = () => {
    const tempOnOrder = [...this.state.onOrder];
    const cleanOrder = tempOnOrder.filter(value => value.code !== '');
    return cleanOrder;
  };

  renderButtons = () => {
    if (this.props.componentFrom === 'OrderDetail' && this.props.isEstimate === '0') {
      return (<button type="button" className="btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>);
    } else if (this.props.componentFrom === 'OrderDetail' && this.props.isEstimate === '1') {
      return null;
    } else {
      return (<Fragment>
        <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsEstimate}>Save As Estimate</button>
        <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsOrder}>Place Order</button>
      </Fragment>);
    }
  };

  render () {
    console.error(this.props.isEstimate);
    const rowsComponent = this.state.onOrder.map((row, i) => {
      return (
        <tr key={i} id={'row-' + (i + 1)}>
          <td>
            <AutoComplete
              dropdownValue={row.code}
              auntoCompleteRowId={i}
              products={this.state.products}
              updateOnOrderCode={this.updateOnOrderCode}
              matchProductDescription={this.matchProductDescription}
              matchProductPrice={this.matchProductPrice}
              calculateRowTotal={this.calculateRowTotal}
            />
          </td>
          <td>{row.description}</td>
          <td>
            <input
              id={'inputRow-' + (i + 1)}
              type="number"
              value={row.quantity}
              onChange={this.updateOnOrderQuantity}
            />
          </td>
          <td>{row.price}</td>
          <td>{row.amount}</td>
          <td
            onClick={this.deleteRow}
            id={'actionRow-' + (i + 1)}
          >
            Delete
          </td>
          {
            // Logic: add an 'add' button to the last row of table
            i === (this.state.onOrder.length - 1) ? (<td onClick={this.addRow}>Add</td>) : (<td></td>)
          }
        </tr>
      );
    });

    const orderTotalComponent = this.state.onOrder.reduce((a, b) => {
      return a + b.amount;
    }, 0);

    return (
      <div className="OrderTable">
        <h2>Order Form</h2>
        <Table responsive id="order-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rowsComponent}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1">Total</td>
              <td colSpan="4"></td>
              <td colSpan="1">{orderTotalComponent}</td>
            </tr>
          </tfoot>
        </Table>
        {this.renderButtons()}
        {/* {
          this.props.componentFrom === 'OrderDetail' ? (
            <button type="button" className="btn btn-lg btn-primary" onClick={this.saveChanges}>Save Changes</button>
          ) : (
            <Fragment>
              <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsEstimate}>Save As Estimate</button>
              <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsOrder}>Place Order</button>
            </Fragment>
          )
        } */}
      </div>
    );
  }
}

export default OrderTable;
