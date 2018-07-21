import React from 'react';
import './OrderByForm.css';

class OrderByForm extends React.Component {
  state = {}
  render () {
    const orderByFromComponent = this.props.buyerProfiles.map((buyerProfile) => {
      return (
        <div key={buyerProfile.id}>
          <h2 className="col-sm-4">Order By</h2>
          <form className="form-horizontal col-sm-12">
            <div className="form-group">
              <label htmlFor="buyer-company" className="col-sm-4 control-label">
                Company:
              </label>
              <div className="col-sm-8">
                {/* first time component gets rendered, the companies array in the state will be empty,
                this.props.companies[0].name will throw an error. In order to solve that,
                add this conditional statement.
                */}
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].name}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].address}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].city}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].state}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].zip}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].phoneNumber}
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
                {this.props.companies[0] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={this.props.companies[0].faxNumber}
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
      );
    });
    return (
      <div>
        {orderByFromComponent}
      </div>
    );
  };
};

export default OrderByForm;
