import React from 'react';
import './OrderTable.css';
import {Table} from 'react-bootstrap';
import AutoComplete from '../../components/AutoComplete/AutoComplete';

class OrderTable extends React.Component {
  createRows = () => {
    const rows = [];
    for (let tr = 0; tr < 10; tr++) {
      rows.push(
        <tr>
          <td>1</td>
          <td>{<AutoComplete />}</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>);
    };
    return rows;
  }
  render () {
    return (
      <div className="OrderTable">
        <h2>Order Form</h2>
        <Table responsive id="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.createRows()};
          </tbody>
        </Table>;
      </div>
    );
  }
}

export default OrderTable;
