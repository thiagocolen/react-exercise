import React from 'react';
import MapWithAMarker from './MapWithAMarker'


class GMap extends React.Component {
  render() {
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '500px', position: 'absolute', width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}


export default GMap
