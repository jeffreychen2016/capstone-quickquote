import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import constants from '../../constants';
import { resolve } from 'url';

export class MapContainer extends React.Component {
  state = {
    address: '',
    coordinate: {},
  }

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
  }

  // can not use setstate here, it will running to infinite loop 'cause
  // every time state changes, the page will re-render, and call the setstate again

  // can not return coordinate and call it inside render either since it is async call,
  // it will run the rest of call before data comes back
  // componentDidUpdate () {
  //   return this.getCoordinate();
  // }

  componentDidMount () {
    this.getCoordinate();
  }

  // getCoordinate = () => {
  //   if (Object.keys(this.state.address).length > 0) {
  //     const address = this.state.address;
  //     Geocode.fromAddress(address).then(
  //       response => {
  //         const { lat, lng } = response.results[0].geometry.location;
  //         const coordinate = {lat, lng};
  //         console.error('coordinate:',coordinate);
  //         this.setState({coordinate});
  //         // return coordinate;
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // };

  getCoordinate = () => {
    return new Promise ((resolve, reject) => {
      if (Object.keys(this.state.address).length > 0) {
        const address = this.state.address;
        Geocode.fromAddress(address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            const coordinate = {lat, lng};
            console.error('coordinate:',coordinate);
            resolve({coordinate});
            // return coordinate;
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  };

  render () {
    const mapComponent = this.getCoordinate().then((coordinate) => {
      return (
        <div className="col-sm-6">
          <Map
            google={this.props.google}
            zoom={8}
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
    });
  return (
    {mapComponent}
  )
  }
}

export default GoogleApiWrapper({
  apiKey: (constants.googleMap.apiKey)
})(MapContainer);
