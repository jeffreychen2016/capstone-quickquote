import React from 'react';
import './OrderDetail.css';
import orderRequests from '../../firebaseRequests/order';
import ShipToForm from '../../components/ShipToForm/ShipToForm';
import OrderTable from '../../components/OrderTable/OrderTable';
import MapContainer from '../../components/Map/Map';

class OrderDetail extends React.Component {
  state = {
    so: {},
    componentFrom: 'OrderDetail',
  };

  componentDidMount () {
    const orderNumber = this.props.match.params.id;
    orderRequests.getSigngeOrder(orderNumber)
      .then((so) => {
        this.setState({so});
      })
      .catch((err) => {
        console.error('Error with getting single order:', err);
      });
  };

  companyChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.companyName = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  addressChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.address = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  cityChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.city = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  stateChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.state = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  zipChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.zip = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  phoneNumberChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.phoneNumber = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  faxNumberChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.faxNumber = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  contactChange = (e) => {
    const tempShipTo = { ...this.state.so.shipTo };
    const tempSO = { ...this.state.so };
    tempShipTo.contact = e.target.value;
    tempSO.shipTo = tempShipTo;
    this.setState({ so: tempSO });
  };

  redirectToMyOrderAfterPost = () => {
    this.props.history.push('/myorder');
  };

  render () {
    const fullAddress = this.state.so;
    const orderNumber = this.props.match.params.id;
    return (
      <div className="OrderDetail container-fluid">
        <div className="row">
          <h2>OrderDetail</h2>
          <div>
            <span className="col-sm-5">Order Number:{orderNumber}</span>
            <span className="col-sm-2">Status:{
              this.state.so.isOrder === 0 ? 'Estimate' : 'SO'
            }</span>
            <span className="col-sm-5">Date Created:{this.state.so.date}</span>
          </div>
        </div>
        <div className="row">
          <h2>Shipping Info</h2>
          {this.state.so.shipTo ? (
            <ShipToForm
              shipTo={this.state.so.shipTo}
              companyChange={this.companyChange}
              addressChange={this.addressChange}
              cityChange={this.cityChange}
              stateChange={this.stateChange}
              zipChange={this.zipChange}
              phoneNumberChange={this.phoneNumberChange}
              faxNumberChange={this.faxNumberChange}
              contactChange={this.contactChange}
              componentFrom={this.state.componentFrom}
              isEstimate={this.props.match.params.isEstimate}
            />) : (null)}
          <MapContainer
            address={fullAddress}
          />
        </div>
        <div className="row">
          <OrderTable
            orderId={this.props.match.params.id}
            isEstimate={this.props.match.params.isEstimate}
            componentFrom={this.state.componentFrom}
            redirectToMyOrderAfterPost={this.redirectToMyOrderAfterPost}
            shipTo={this.state.so.shipTo}
          />
        </div>
      </div>
    );
  };
};

export default OrderDetail;
