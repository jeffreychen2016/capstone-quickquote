import React from 'react';
import './OrderForm.css';
import SupplierProfile from '../../components/SupplierProfile/SupplierProfile';

class OrderForm extends React.Component {
  render () {
    return (
      <div className="OrderForm">
        <h2>OrderForm</h2>
        <SupplierProfile />
      </div>
    );
  };
};

export default OrderForm;
