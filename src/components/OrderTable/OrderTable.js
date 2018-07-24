import React from 'react';
import './OrderTable.css';
import { Table } from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import productRequests from '../../firebaseRequests/product';
import orderRequests from '../../firebaseRequests/order';
import authRequests from '../../firebaseRequests/auth';

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
  }

  componentDidMount () {
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
    for (let i = 0; i < 10; i++)
      this.state.onOrder.push(
        {
          code: '',
          description: '',
          quantity: 0,
          price: 0,
          amount: 0,
          isOrder: 0,
        });
  };

  matchProductDescription = (selectedOption,id) => {
    const products = this.state.products;
    products.map((product, i) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[id].description = product.description;
        this.setState({onOrder: tempOnOrder});
      };
    });
  };

  matchProductPrice = (selectedOption,id) => {
    const products = this.state.products;
    products.map((product) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[id].price = product.price;
        this.setState({onOrder: tempOnOrder});
      };
    });
  }

  updateOnOrderCode = (selectedOption,id) => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].code = selectedOption;
    this.setState({onOrder: tempOnOrder});
  };

  updateOnOrderQuantity = (e) => {
    // find the row to detect which input box gets changed then update the state accordingly
    // row id starts with 1, but the index in the state state starts with 0, so need to minus 1
    const id = e.target.id.split('-').pop() - 1;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].quantity = e.target.value;
    this.setState({onOrder: tempOnOrder});

    this.calculateRowTotal(id);
  };

  calculateRowTotal = (id) => {
    const onOrder = this.state.onOrder[id];
    const rowAmount = onOrder.price * onOrder.quantity;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[id].amount = rowAmount;
    this.setState({onOrder: tempOnOrder});
  };

  // delete tempOnOrder[i] will still leave "empty" in the array, which will break other codes
  // so user "splice" to remove deleted row
  deleteRow = (e) => {
    const id = e.target.id.split('-').pop() - 1;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder.map((row,i) => {
      i === id ? tempOnOrder.splice(i,1) : 'nothing';
    });
    this.setState({onOrder: tempOnOrder});
  }

  addRow = () => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder.push({
      code: '',
      description: '',
      quantity: 0,
      price: 0,
      amount: 0,
      action: '',
      isOrder: 0,
    });
    this.setState({onOrder: tempOnOrder});
  };

  updateIsOrder = (bool) => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder.map((row) => {
      row.isOrder = bool;
    });
    this.setState({onOrder: tempOnOrder});
  };

  mergeOrderAndShippingAndUid = () => {
    const userId = authRequests.getUserId();
    const orderToPost = this.cleanOrderObjectForPosting();
    const shippingAddressToPost = this.props.shipTo;
    const mergedOrderWithShippingAddress = {uid: userId, shippingAddress: shippingAddressToPost, items: orderToPost };
    return mergedOrderWithShippingAddress;
  };

  // update the isOrder to either 1 or 0
  // merge order with shipping address and user id
  // post to database
  saveAsOrder = () => {

    this.updateIsOrder(1);
    const mergedOrderWithShippingAddress = this.mergeOrderAndShippingAndUid();
    orderRequests.postOrder(mergedOrderWithShippingAddress)
      .then((res) => {
        this.props.redirectToMyOrderAfterPost();
      })
      .catch((err) => {
        console.error('Errot with posting order to database:',err);
      });
  };

  saveAsEstimate = () => {
    this.updateIsOrder(0);
    const mergedOrderWithShippingAddress = this.mergeOrderAndShippingAndUid();
    orderRequests.postOrder(mergedOrderWithShippingAddress)
      .then((res) => {
        this.props.redirectToMyOrderAfterPost();
      })
      .catch((err) => {
        console.error('Errot with posting order to database:',err);
      });
  };

  cleanOrderObjectForPosting = () => {
    const tempOnOrder = [...this.state.onOrder];
    const tempOnOrderAfterFilter = tempOnOrder.filter(value => value.code !== '');
    return tempOnOrderAfterFilter;
  };

  render () {
    const rowsComponent = this.state.onOrder.map((row, i) => {
      return (
        <tr key={i} id={'row-' + (i + 1)}>
          <td>
            <AutoComplete
              dropdownValue={this.state.onOrder[i].code}
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

    const orderTotalComponent = this.state.onOrder.reduce((a,b) => {
      return a + b.amount;
    },0);

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
        <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsEstimate}>Save As Estimate</button>
        <button type="button" className="btn btn-lg btn-primary" onClick={this.saveAsOrder}>Place Order</button>
      </div>
    );
  }
}

export default OrderTable;
