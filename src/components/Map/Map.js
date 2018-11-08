import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import constants from '../../constants';

export class MapContainer extends React.Component {
  state = {
    address: '',
    coordinate: {},
  };

  // first time the props will be empty since so object in OrderDetail is empty
  // second time the props has value, then assign to state to trigger re-render
  // if not use it, only first prop will get pass from OrderDetail and being render
  // second prop will also pass, but will not re-render the page
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.address !== prevState.address) {
      if (Object.keys(nextProps.address).length > 0) {
        const addressObject = nextProps.address.shipTo;
        const fullAddress = addressObject.address + ' ' + addressObject.city + ', ' + addressObject.state + ' ' + addressObject.zip;
        return { address: fullAddress };
      } else return null;
    }
    else return null;
  };

  // can not use setstate here, it will running to infinite loop 'cause
  // every time state changes, the page will re-render, and call the setstate again

  // can not return coordinate and call it inside render either since it is async call,
  // it will run the rest of call before data comes back

  // call the getCoordinate() inside render, if there is no this shouldComponentUpdate method
  // it will run into infinite loop.
  // this ensures the component keep rendering until the coordinate data comes back from the async call
  // and without running into infinite loop
  shouldComponentUpdate (nextProps, nextState) {
    return Object.keys(this.state.coordinate).length === 0;
  };

  getCoordinate = () => {
    Geocode.setApiKey(constants.googleGeocode.apiKey);
    if (Object.keys(this.state.address).length > 0) {
      const address = this.state.address;
      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          const coordinate = {lat, lng};
          const tempCoordinate = {...this.state.coordinate};
          tempCoordinate.lat = coordinate.lat;
          tempCoordinate.lng = coordinate.lng;
          this.setState({coordinate: tempCoordinate});
        },
        error => {
          console.error('something broken with getCoordinate(): ', error);
        }
      );
    }
  };

  // when coordinate object has no value, do not render it becuase the map can only render once
  // if first time there is no valid coordinate, the map will grey out
  // this conditional ensure the map gets rendered only when there is valid coordinate
  render () {
    this.getCoordinate();
    const coordinate = this.state.coordinate;
    // const coordinate = {lat: 30.8756862, lng:-87.9131511};
    if (Object.keys(coordinate).length === 0) { return null; }
    return (
      <div className="col-sm-6">
        <Map
          google={this.props.google}
          zoom={16}
          style={{
            width: '90%',
            height: '280px',
          }}
          initialCenter={coordinate}
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
  apiKey: (constants.googleMap.apiKey),
})(MapContainer);
