import React from 'react';
import './OrderForm.css';
import SupplierProfile from '../../components/SupplierProfile/SupplierProfile';
import BuyerProfile from '../../components/BuyerProfile/BuyerProfile';

class OrderForm extends React.Component {
  render () {
    return (
      <div className="OrderForm">
        <h2>OrderForm</h2>
        <SupplierProfile />
        <BuyerProfile />
      </div>
    );
  };
};

export default OrderForm;
