import React from 'react';
import './OrderForm.css';
// import SupplierProfile from '../../components/SupplierProfile/SupplierProfile';
import BuyerProfile from '../../components/BuyerProfile/BuyerProfile';
import OrderTable from '../../components/OrderTable/OrderTable';
import authRequests from '../../firebaseRequests/auth';
import buyerProfileRequests from '../../firebaseRequests/buyerProfile';
import companyRequests from '../../firebaseRequests/company';

class OrderForm extends React.Component {
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
      (this.setState({ isChecked: false })) : (
        this.setState({ isChecked: true })
      );
  };

  sameAsAboveClick = (e) => {
    if (e.target.checked) {
      const buyerCompany = this.state.companies[0];
      const tempShipTo = { ...this.state.shipTo };
      tempShipTo.companyName = buyerCompany.name;
      tempShipTo.address = buyerCompany.address;
      tempShipTo.state = buyerCompany.state;
      tempShipTo.city = buyerCompany.city;
      tempShipTo.zip = buyerCompany.zip;
      tempShipTo.phoneNumber = buyerCompany.phoneNumber;
      tempShipTo.faxNumber = buyerCompany.faxNumber;
      tempShipTo.contact = this.state.buyerProfiles[0].firstName + ' ' + this.state.buyerProfiles[0].lastName;
      this.setState({ shipTo: tempShipTo });
      this.updateIsCheckStatus();
    } else {
      const tempShipTo = { ...this.state.shipTo };
      tempShipTo.companyName = '';
      tempShipTo.address = '';
      tempShipTo.state = '';
      tempShipTo.city = '';
      tempShipTo.zip = '';
      tempShipTo.phoneNumber = '';
      tempShipTo.faxNumber = '';
      tempShipTo.contact = '';
      this.setState({ shipTo: tempShipTo });
      this.updateIsCheckStatus();
    };
  };

  companyChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.companyName = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  addressChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.address = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  cityChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.city = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  stateChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.state = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  zipChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.zip = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  phoneNumberChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.phoneNumber = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  faxNumberChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.faxNumber = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  contactChange = (e) => {
    const tempShipTo = { ...this.state.shipTo };
    tempShipTo.contact = e.target.value;
    this.setState({ shipTo: tempShipTo });
  };

  redirectToMyOrderAfterPost = () => {
    this.props.history.push('/myorder');
  };

  render () {
    return (
      <div className="OrderForm container-fluid ">
        <h2>Order Form</h2>
        <div className="row">
          {/* <SupplierProfile /> */}
          <BuyerProfile
            buyerProfiles={this.state.buyerProfiles}
            companies={this.state.companies}
            shipTo={this.state.shipTo}
            isChecked={this.state.isChecked}
            updateIsCheckStatus={this.updateIsCheckStatus}
            sameAsAboveClick={this.sameAsAboveClick}
            companyChange={this.companyChange}
            addressChange={this.addressChange}
            cityChange={this.cityChange}
            stateChange={this.stateChange}
            zipChange={this.zipChange}
            phoneNumberChange={this.phoneNumberChange}
            faxNumberChange={this.faxNumberChange}
            contactChange={this.contactChange}
          />
        </div>
        <div className="row">
          <OrderTable
            shipTo={this.state.shipTo}
            redirectToMyOrderAfterPost={this.redirectToMyOrderAfterPost}
          />
        </div>
      </div>
    );
  };
};

export default OrderForm;
