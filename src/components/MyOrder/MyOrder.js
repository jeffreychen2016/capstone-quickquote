import React from 'react';
import './MyOrder.css';
import { Table } from 'react-bootstrap';

class MyOrder extends React.Component {
  render () {
    return (
      <div className="MyOrder">
        <h2>MyOrder</h2>
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
            <tr>
              <td>SO12</td>
              <td>2018-01-01</td>
              <td>500</td>
              <td>
                <button>Delete</button>
                <button>Place Order</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };
};

export default MyOrder;
