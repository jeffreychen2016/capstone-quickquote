import React from 'react';
import './BuyerProfile.css';
import ShipToForm from '../ShipToForm/ShipToForm';
import OrderByForm from '../OrderByForm/OrderByForm';

class BuyerProfile extends React.Component {
  render () {
    return (
      <div id="buyer-profile-container" className="col-sm-12">
        <div className="col-sm-6 left-panel">
          <OrderByForm
            buyerProfiles={this.props.buyerProfiles}
            companies={this.props.companies}
          />
        </div>
        <div className="col-sm-6 right-panel">
          <ShipToForm
            shipTo={this.props.shipTo}
            isChecked={this.props.isChecked}
            updateIsCheckStatus={this.props.updateIsCheckStatus}
            sameAsAboveClick={this.props.sameAsAboveClick}
            companyChange={this.props.companyChange}
            addressChange={this.props.addressChange}
            cityChange={this.props.cityChange}
            stateChange={this.props.stateChange}
            zipChange={this.props.zipChange}
            phoneNumberChange={this.props.phoneNumberChange}
            faxNumberChange={this.props.faxNumberChange}
            contactChange={this.props.contactChange}
          />
        </div>
      </div>
    );
  }
};

export default BuyerProfile;
