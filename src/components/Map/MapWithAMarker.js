import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -23.0, lng: -47.0 }}
  >
    <Marker
      position={{ lat: -23.0, lng: -47.0 }}
    />
    <Marker
      position={{ lat: -23.01, lng: -47.0 }}
    />
  </GoogleMap>
));

export default MapWithAMarker
