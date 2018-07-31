import React, { Fragment } from 'react';
import './ShipToForm.css';

class ShipToForm extends React.Component {
  render () {
    return (
      <div>
        {
          this.props.componentFrom === 'OrderDetail' ? (
            null
          ) : (
            <Fragment>
              <h2 className="col-sm-4">Ship To</h2>
              <div className="col-sm-6" id="ship-to-checkbox-container">
                <input
                  type="checkbox"
                  id="ship-to-checkbox"
                  onChange={this.props.sameAsAboveClick}
                />
                <label htmlFor="ship-to-checkbox">Same as above</label>
              </div>
            </Fragment>
          )
        }
        <form className={`form-horizontal ${this.props.componentFrom === 'OrderDetail' ? 'col-sm-6 col-sm-offset-3' : 'col-sm-12'}`}>
          <div className="form-group">
            <label htmlFor="buyer-company" className="col-sm-4 control-label">
              Company:
            </label>
            <div className="col-sm-8">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.companyName}
                  onChange={this.props.companyChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.props.companyChange}
                    value={this.props.shipTo.companyName}
                  />
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyer-address" className="col-sm-4 control-label">
              Address:
            </label>
            <div className="col-sm-8">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.address}
                  onChange={this.props.addressChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.props.addressChange}
                    value={this.props.shipTo.address}
                  />
                )
              }
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3 col-sm-offset-4">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.city}
                  onChange={this.props.cityChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.city}
                    onChange={this.props.cityChange}
                  />
                )
              }
            </div>
            <div className="col-sm-2">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.state}
                  onChange={this.props.stateChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.state}
                    onChange={this.props.stateChange}
                  />
                )
              }
            </div>
            <div className="col-sm-3">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.zip}
                  onChange={this.props.zipChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.zip}
                    onChange={this.props.zipChange}
                  />
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyer-address" className="col-sm-4 control-label">
              Phone Number:
            </label>
            <div className="col-sm-8">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.phoneNumber}
                  onChange={this.props.phoneNumberChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.phoneNumber}
                    onChange={this.props.phoneNumberChange}
                  />
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyer-address" className="col-sm-4 control-label">
              Fax Number:
            </label>
            <div className="col-sm-8">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.faxNumber}
                  onChange={this.props.faxNumberChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.faxNumber}
                    onChange={this.props.faxNumberChange}
                  />
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="buyer-address" className="col-sm-4 control-label">
              Contact:
            </label>
            <div className="col-sm-8">
              {this.props.isChecked ?
                (<input
                  type="text"
                  className="form-control"
                  value={this.props.shipTo.contact}
                  onChange={this.props.contactChange}
                  disabled
                />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.shipTo.contact}
                    onChange={this.props.contactChange}
                  />
                )
              }
            </div>
          </div>
        </form>
      </div>
    );
  };
};

export default ShipToForm;
