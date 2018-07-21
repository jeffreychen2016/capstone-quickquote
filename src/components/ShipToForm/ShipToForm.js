import React from 'react';
import './ShipToForm.css';

class ShipToForm extends React.Component {
  render () {
    return (
      <div id="buyer-profile-container" className="col-sm-12">
        <div className="col-sm-6 right-panel">
          <h2 className="col-sm-4">Ship To</h2>
          <div className="col-sm-6" id="ship-to-checkbox-container">
            <input
              type="checkbox"
              id="ship-to-checkbox"
              onChange={this.sameAsAboveClick}
            />
            <label htmlFor="ship-to-checkbox">Same as above</label>
          </div>
          <form className="form-horizontal col-sm-12">
            <div className="form-group">
              <label htmlFor="buyer-company" className="col-sm-4 control-label">
                Company:
              </label>
              <div className="col-sm-8">
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.companyName}
                    onChange={this.companyChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.companyChange}
                      value={this.state.shipTo.companyName}
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
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.address}
                    onChange={this.addressChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.addressChange}
                      value={this.state.shipTo.address}
                    />
                  )
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-4">
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.city}
                    onChange={this.cityChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.city}
                      onChange={this.cityChange}
                    />
                  )
                }
              </div>
              <div className="col-sm-2">
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.state}
                    onChange={this.stateChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.state}
                      onChange={this.stateChange}
                    />
                  )
                }
              </div>
              <div className="col-sm-3">
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.zip}
                    onChange={this.zipChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.zip}
                      onChange={this.zipChange}
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
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.phoneNumber}
                    onChange={this.phoneNumberChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.phoneNumber}
                      onChange={this.phoneNumberChange}
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
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.faxNumber}
                    onChange={this.faxNumberChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.faxNumber}
                      onChange={this.faxNumberChange}
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
                {this.state.isChecked ?
                  (<input
                    type="text"
                    className="form-control"
                    value={this.state.shipTo.contact}
                    onChange={this.contactChange}
                    disabled
                  />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.contact}
                      onChange={this.contactChange}
                    />
                  )
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

export default ShipToForm;
