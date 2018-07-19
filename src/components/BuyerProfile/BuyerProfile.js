import React from 'react';
import './BuyerProfile.css';
import authRequests from '../../firebaseRequests/auth';

class BuyerProfile extends React.Component {
  render () {
    console.error(authRequests.getUserId());
    return (
      <div id="buyer-profile-container" className="col-sm-12">
        <div className="col-sm-6 left-panel">
          <h2 className="col-sm-4">Order By</h2>
          <form className="form-horizontal col-sm-12">
            <div className="form-group">
              <label htmlFor="buyer-company" className="col-sm-4 control-label">
                Company:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.name}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Address:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.address}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-4">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.city}
                  disabled
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.state}
                  disabled
                />
              </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.zip}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Phone Number:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.phoneNumber}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Fax Number:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.faxNumber}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Agent:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={moment().format('YYYY-MM-DD h:m:s a')}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-6 right-panel">
          <h2 className="col-sm-4">Ship To</h2>
          <div className="col-sm-6" id="ship-to-checkbox-container">
            <input type="checkbox" id="ship-to-checkbox"/>
            <label htmlFor="ship-to-checkbox">Same as above</label>
          </div>
          <form className="form-horizontal col-sm-12">
            <div className="form-group">
              <label htmlFor="buyer-company" className="col-sm-4 control-label">
                Company:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.name}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Address:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.address}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-4">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.city}
                  disabled
                />
              </div>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.state}
                  disabled
                />
              </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.zip}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Phone Number:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.phoneNumber}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Fax Number:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={supplierProfile.faxNumber}
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="buyer-address" className="col-sm-4 control-label">
                Contact:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  // value={moment().format('YYYY-MM-DD h:m:s a')}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

export default BuyerProfile;
