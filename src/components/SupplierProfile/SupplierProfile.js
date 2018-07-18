import React from 'react';
import './SupplierProfile.css';
import supplierProfileRequests from '../../firebaseRequests/supplierProfile';

class SupplierProfile extends React.Component {
  state = {
    supplierProfile: {
      name: 'abc',
      address: '123 street',
      city: 'nashville',
      state: 'tn',
      zip: '10000',
    },
  }

  componentDidMount () {
    supplierProfileRequests.getRequest()
      .then((res) => {
        console.error(res);
      })
      .catch((err) => {
        console.error('Error with getting supplier data:',err);
      });
  };

  render () {
    return (
      <div className="SupplierProfile">
        <h2>SupplierProfile</h2>
      </div>
    );
  };
};

export default SupplierProfile;
