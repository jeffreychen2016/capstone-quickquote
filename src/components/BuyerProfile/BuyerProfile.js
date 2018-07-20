import React from 'react';
import './BuyerProfile.css';
import authRequests from '../../firebaseRequests/auth';
import buyerProfileRequests from '../../firebaseRequests/buyerProfile';
import companyRequests from '../../firebaseRequests/company';

class BuyerProfile extends React.Component {
  state = {
    buyerProfiles: [],
    companies: [],
    shipTo: {
      companyName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      faxNumber: '',
      contact: '',
    },
    isChecked: false,
  };

  // Get the current user info
  // Then fetch company id from current user to get the company info
  componentDidMount () {
    buyerProfileRequests
      .getUserInfoRequest(authRequests.getUserId())
      .then((buyerProfiles) => {
        this.setState({buyerProfiles});
        companyRequests.getCurrentUserCompanyInfo(this.state.buyerProfiles[0].companyId)
          .then((companies) => {
            this.setState({companies});
          });
      })
      .catch((err) => {
        console.error('Error with getting user data:', err);
      });
  };

  updateIsCheckStatus = () => {
    this.state.isChecked ?
      (this.setState({isChecked : false})) : (
        this.setState({isChecked : true})
      );
  };

  sameAsAboveClick = (e) => {
    if (e.target.checked) {
      const buyerCompany = this.state.companies[0];
      const tempShipTo = {...this.state.shipTo};
      tempShipTo.companyName = buyerCompany.name;
      tempShipTo.address = buyerCompany.address;
      tempShipTo.state = buyerCompany.state;
      tempShipTo.city = buyerCompany.city;
      tempShipTo.zip = buyerCompany.zip;
      tempShipTo.phoneNumber = buyerCompany.phoneNumber;
      tempShipTo.faxNumber = buyerCompany.faxNumber;
      tempShipTo.contact = this.state.buyerProfiles[0].firstName + ' ' + this.state.buyerProfiles[0].lastName;
      this.setState({shipTo: tempShipTo});
      this.updateIsCheckStatus();
    } else {
      const tempShipTo = {...this.state.shipTo};
      tempShipTo.companyName = '';
      tempShipTo.companyName = '';
      tempShipTo.address = '';
      tempShipTo.state = '';
      tempShipTo.city = '';
      tempShipTo.zip = '';
      tempShipTo.phoneNumber = '';
      tempShipTo.faxNumber = '';
      tempShipTo.contact = '';
      this.setState({shipTo: tempShipTo});
      this.updateIsCheckStatus();
    };
  };

  render () {
    const buyerProfileComponent = this.state.buyerProfiles.map((buyerProfile) => {
      return (
        <div id="buyer-profile-container" className="col-sm-12" key={buyerProfile.id}>
          <div className="col-sm-6 left-panel">
            <h2 className="col-sm-4">Order By</h2>
            <form className="form-horizontal col-sm-12">
              <div className="form-group">
                <label htmlFor="buyer-company" className="col-sm-4 control-label">
                  Company:
                </label>
                <div className="col-sm-8">
                  {/* first time component gets rendered, the companies array in the state will be empty,
                  this.state.companies[0].name will throw an error. In order to solve that,
                  add this conditional statement.
                  */}
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].name}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="buyer-address" className="col-sm-4 control-label">
                  Address:
                </label>
                <div className="col-sm-8">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].address}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-3 col-sm-offset-4">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].city}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
                <div className="col-sm-2">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].state}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
                <div className="col-sm-3">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].zip}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="buyer-address" className="col-sm-4 control-label">
                  Phone Number:
                </label>
                <div className="col-sm-8">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].phoneNumber}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="buyer-address" className="col-sm-4 control-label">
                  Fax Number:
                </label>
                <div className="col-sm-8">
                  {this.state.companies[0] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.companies[0].faxNumber}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      disabled
                    />
                  )}
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
                    value={buyerProfile.firstName + ' ' + buyerProfile.lastName}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
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
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.companyName}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
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
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.address}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.address}
                      />
                    )
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-3 col-sm-offset-4">
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.city}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.city}
                      />
                    )
                  }
                </div>
                <div className="col-sm-2">
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.state}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.state}
                      />
                    )
                  }
                </div>
                <div className="col-sm-3">
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.zip}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.zip}
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
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.phoneNumber}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.phoneNumber}
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
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.faxNumber}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.faxNumber}
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
                  { this.state.isChecked ?
                    (<input
                      type="text"
                      className="form-control"
                      value={this.state.shipTo.contact}
                      disabled
                    />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.shipTo.contact}
                      />
                    )
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    });
    return (
      <div className="BuyerProfile">
        {buyerProfileComponent}
      </div>
    );
  };
};

export default BuyerProfile;
