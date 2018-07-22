import React from 'react';
import './OrderTable.css';
import { Table } from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import productRequests from '../../firebaseRequests/product';

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
      //   action: '',
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
          action: '',
        });
  };

  matchProductDescription = (selectedOption,id) => {
    const products = this.state.products;
    products.map((product) => {
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

  render () {
    console.error(this.state.onOrder);
    const rowsComponent = this.state.onOrder.map((row, i) => {
      return (
        <tr key={i} id={'row-' + (i + 1)}>
          <td>
            <AutoComplete
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
              onChange={e => this.updateOnOrderQuantity(e)}
            />
          </td>
          <td>{row.price}</td>
          <td>{row.amount}</td>
          <td>Delete</td>
        </tr>
      );
    });
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
        </Table>
      </div>
    );
  }
}

export default OrderTable;
