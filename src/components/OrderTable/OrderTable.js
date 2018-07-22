import React from 'react';
import './OrderTable.css';
import { Table } from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import productRequests from '../../firebaseRequests/product';

class OrderTable extends React.Component {
  state = {
    products: [],
    onOrder: [
      {
        code: '',
        description: '',
        quantity: 0,
        price: 0,
        amount: 0,
        action: '',
      },
    ],
  }

  componentDidMount () {
    this.getAllProducts();
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

  matchProductDescription = (selectedOption) => {
    const products = this.state.products;
    products.map((product) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[0].description = product.description;
        this.setState({onOrder: tempOnOrder});
      };
    });
  };

  matchProductPrice = (selectedOption) => {
    const products = this.state.products;
    products.map((product) => {
      if (selectedOption.label === product.code) {
        const tempOnOrder = [...this.state.onOrder];
        tempOnOrder[0].price = product.price;
        this.setState({onOrder: tempOnOrder});
      };
    });
  }

  updateOnOrderCode = (selectedOption) => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[0].code = selectedOption;
    this.setState({onOrder: tempOnOrder});
  };

  updateOnOrderQuantity = (e) => {
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[0].quantity = e.target.value;
    this.setState({onOrder: tempOnOrder});
    this.calculateRowTotal();
  };

  calculateRowTotal = () => {
    const onOrder = this.state.onOrder[0];
    const rowAmount = onOrder.price * onOrder.quantity;
    const tempOnOrder = [...this.state.onOrder];
    tempOnOrder[0].amount = rowAmount;
    this.setState({onOrder: tempOnOrder});
  };

  render () {
    const rowsComponent = this.state.onOrder.map((row, i) => {
      return (
        <tr key={i}>
          <td>
            <AutoComplete
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
              type="number"
              value={row.quantity}
              onChange={this.updateOnOrderQuantity}
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
