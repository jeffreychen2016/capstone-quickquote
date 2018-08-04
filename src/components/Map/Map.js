import React from 'react';
import './Map.css';
import Geocode from 'react-geocode';

class Map extends React.Component {
  state = {
    address: '',
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   const fullAddress = this.props.getFullAddress();
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  componentDidMount () {
    this.getCoordinate();
  };

  getCoordinate = () => {
    const fullAddress = this.props.getFullAddress();
    this.setState({address: fullAddress}, () => {
      Geocode.fromAddress(this.state.address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.error(lat, lng);
        },
        error => {
          console.error(error);
        }
      );
    });
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
