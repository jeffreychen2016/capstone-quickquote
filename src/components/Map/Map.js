import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';

class Map extends React.Component {
  state = {
    address: '',
  }

  // first time the props will be empty since so object in OrderDetail is empty
  // second time the props has value, then assign to state
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.address !== prevState.address) {
      if (Object.keys(nextProps.address).length > 0) {
        const addressObject = nextProps.address.shipTo;
        const fullAddress = addressObject.address + ' ' + addressObject.city + ', ' + addressObject.state + ' ' + addressObject.zip;
        return { address: fullAddress };
      }
    }
    else return null;
  }

  getCoordinate = () => {
    const address = this.state.address;
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.error(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

  };

  render () {
    this.getCoordinate();
    return (
      <div className="Map col-sm-6">
        <h2>Map</h2>
      </div>
    );
  }
}

export default Map;
