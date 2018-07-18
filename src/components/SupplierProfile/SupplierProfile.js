import React from 'react';
import './SupplierProfile.css';
import supplierProfileRequests from '../../firebaseRequests/supplierProfile';
import moment from 'moment';

class SupplierProfile extends React.Component {
  state = {
    supplierProfiles: [],
  }

  componentDidMount () {
    supplierProfileRequests.getRequest()
      .then((supplierProfiles) => {
        this.setState({ supplierProfiles });
      })
      .catch((err) => {
        console.error('Error with getting supplier data:',err);
      });
  };

  render () {
    const supplierProfileComponent = this.state.supplierProfiles.map((supplierProfile) => {
      return (
        <div id="supplier-profile-container" className="col-sm-12">
          <div className="col-sm-6 left-panel">
            <form className="form-horizontal col-sm-12">
              <div className="form-group">
                <label htmlFor="supplier-company" className="col-sm-4 control-label">
                  Company:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.name}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="supplier-address" className="col-sm-4 control-label">
                  Address:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.address}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-3 col-sm-offset-4">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.city}
                    disabled
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.state}
                    disabled
                  />
                </div>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.zip}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="supplier-address" className="col-sm-4 control-label">
                  Phone Number:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.phoneNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="supplier-address" className="col-sm-4 control-label">
                  Fax Number:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={supplierProfile.faxNumber}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="supplier-address" className="col-sm-4 control-label">
                  Date:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={moment().format('YYYY-MM-DD h:m:s a')}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-6 right-panel">
            <h1 className="col-sm-10">Quick Quote</h1>
            <div className="col-sm-10">
              <img src="https://secretmenus.com/wp-content/uploads/2017/11/mcdonalds-400x266.jpg" alt=""/>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="SupplierProfile">
        {supplierProfileComponent}
      </div>
    );
  };
};

export default SupplierProfile;
