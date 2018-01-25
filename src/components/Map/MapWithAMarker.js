import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props => {
  return(
    <Markers places={props.places} />
  )
}));



const Markers = (props) => {

  const AllMarkers = props.places.map((item, index) => 
    <Marker key={index} position={{ lat: item.lat , lng: item.lng }} />
  )

  return(
    <GoogleMap 
      defaultZoom={12}
      defaultCenter={{ lat: -23.0, lng: -47.0 }}
    >
      { AllMarkers }
    </GoogleMap>
  )
}


export default MapWithAMarker
