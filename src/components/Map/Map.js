import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';

class Map extends React.Component {

  componentDidMount () {
    this.getCoordinate();
  };

  getCoordinate = () => {
    Geocode.fromAddress('320 swynford ct').then(
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
    return (
      <div className="Map col-sm-6">
        <h2>Map</h2>
      </div>
    );
  }
}

export default Map;
