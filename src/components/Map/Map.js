import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import constants from '../../constants';

export class MapContainer extends React.Component {
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
      } else return null;
    }
    else return null;
  }

  getCoordinate = () => {
    if (Object.keys(this.state.address).length > 0) {
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
    }
  };

  render () {
    this.getCoordinate();
    return (
      <div className="col-sm-6">
        <Map
          google={this.props.google}
          zoom={8}
          style={{
            width: '90%',
            height: '280px',
          }}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
        >
          <Marker onClick={this.onMarkerClick}
            name={'Current location'}
          />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
              <h1>{1}</h1>
            </div>
          </InfoWindow>

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (constants.googleMap.apiKey)
})(MapContainer);
