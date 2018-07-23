import React from 'react';
import './BuyerProfile.css';
import authRequests from '../../firebaseRequests/auth';
import buyerProfileRequests from '../../firebaseRequests/buyerProfile';
import companyRequests from '../../firebaseRequests/company';
import ShipToForm from '../ShipToForm/ShipToForm';
import OrderByForm from '../OrderByForm/OrderByForm';

class BuyerProfile extends React.Component {
  // state = {
  //   buyerProfiles: [],
  //   companies: [],
  //   shipTo: {
  //     companyName: '',
  //     address: '',
  //     city: '',
  //     state: '',
  //     zip: '',
  //     phoneNumber: '',
  //     faxNumber: '',
  //     contact: '',
  //   },
  //   isChecked: false,
  // };

  // // Get the current user info
  // // Then fetch company id from current user to get the company info
  // componentDidMount () {
  //   buyerProfileRequests
  //     .getUserInfoRequest(authRequests.getUserId())
  //     .then((buyerProfiles) => {
  //       this.setState({buyerProfiles});
  //       companyRequests.getCurrentUserCompanyInfo(this.state.buyerProfiles[0].companyId)
  //         .then((companies) => {
  //           this.setState({companies});
  //         });
  //     })
  //     .catch((err) => {
  //       console.error('Error with getting user data:', err);
  //     });
  // };

  // updateIsCheckStatus = () => {
  //   this.state.isChecked ?
  //     (this.setState({isChecked: false})) : (
  //       this.setState({isChecked: true})
  //     );
  // };

  // sameAsAboveClick = (e) => {
  //   if (e.target.checked) {
  //     const buyerCompany = this.state.companies[0];
  //     const tempShipTo = {...this.state.shipTo};
  //     tempShipTo.companyName = buyerCompany.name;
  //     tempShipTo.address = buyerCompany.address;
  //     tempShipTo.state = buyerCompany.state;
  //     tempShipTo.city = buyerCompany.city;
  //     tempShipTo.zip = buyerCompany.zip;
  //     tempShipTo.phoneNumber = buyerCompany.phoneNumber;
  //     tempShipTo.faxNumber = buyerCompany.faxNumber;
  //     tempShipTo.contact = this.state.buyerProfiles[0].firstName + ' ' + this.state.buyerProfiles[0].lastName;
  //     this.setState({shipTo: tempShipTo});
  //     this.updateIsCheckStatus();
  //   } else {
  //     const tempShipTo = {...this.state.shipTo};
  //     tempShipTo.companyName = '';
  //     tempShipTo.address = '';
  //     tempShipTo.state = '';
  //     tempShipTo.city = '';
  //     tempShipTo.zip = '';
  //     tempShipTo.phoneNumber = '';
  //     tempShipTo.faxNumber = '';
  //     tempShipTo.contact = '';
  //     this.setState({shipTo: tempShipTo});
  //     this.updateIsCheckStatus();
  //   };
  // };

  // companyChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.companyName = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // addressChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.address = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // cityChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.city = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // stateChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.state = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // zipChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.zip = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // phoneNumberChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.phoneNumber = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // faxNumberChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.faxNumber = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

  // contactChange = (e) => {
  //   const tempShipTo = {...this.state.shipTo};
  //   tempShipTo.contact = e.target.value;
  //   this.setState({shipTo: tempShipTo});
  // };

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
