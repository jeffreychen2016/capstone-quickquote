import React from 'react';
import './OrderTable.css';
import {Table} from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';
import productRequests from '../../firebaseRequests/product';

class OrderTable extends React.Component {
  state = {
    tableRows: [],
    products: [],
    itemOnOrder: [],
  }

  componentDidMount () {
    this.getAllProducts();
  };

  getAllProducts = () => {
    productRequests.getProductsRequest()
      .then((products) => {
        this.setState({products});
        this.createRows();
      })
      .catch((err) => {
        console.error('Error getting products:', err);
      });
  };

  // save dynamically generated rows into state for delete function later
  // can not do string += '<tr></tr>' here, instead, rows have to be saved into an array
  createRows = () => {
    const rows = [];
    for (let tr = 0; tr < 10; tr++) {
      rows.push(
        <tr id={'row-' + (tr + 1)} key={(tr + 1)}>
          <td>
            {<AutoComplete
              products={this.state.products}
              matchProductDescription={this.matchProductDescription}
              updateItemOnOrder={this.updateItemOnOrder}
            />}</td>
          <td>Description shit</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td onClick={this.deleteRow} id={'td-' + (tr + 1)} key={(tr + 1)}>Delete</td>
        </tr>);
    };
    this.setState({tableRows: rows});
  }

  deleteRow = (e) => {
    const rowNumber = e.target.id.split('-').pop();
    const tempTableRows = [...this.state.tableRows];
    // table row id starts with 1, tempTableRows obejct index starts with 0.
    delete tempTableRows[(rowNumber - 1)];
    this.setState({tableRows: tempTableRows});
  };

  matchProductDescription = (selectedOption) => {
    const products = this.state.products;
    for (let i = 0; i < products.length; i++) {
      if (selectedOption.label === products[i].code) {
        console.error('real description:',products[i].description);
        console.error('hard coded description:',this.state.tableRows[0].props.children[1].props.children);
        const tempTableRows = {...this.state.tableRows};
        tempTableRows[0].props.children[1].props.children = products[i].description;
        this.setState({tableRows: tempTableRows});
      }
    };
  };

  render () {
    // if (this.state.tableRows[0]) {
    //   console.error(this.state.tableRows[0].props.children[1].props.children);
    // }

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
            {this.state.tableRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default OrderTable;
