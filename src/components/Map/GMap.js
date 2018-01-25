import React from 'react';
import MapWithAMarker from './MapWithAMarker';
import firebase from 'firebase';


class GMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      lat: 0,
      lng: 0
    }
  }

  componentWillMount () {
    console.log('componentWillMount');
    firebase.database().ref('places/')
      .on('value', function(dataSnapshot) {
        var items = [];
        dataSnapshot.forEach(function(childSnapshot) {
          items.push(childSnapshot.val());
        });

        this.setState({
          places: items
        });
      }.bind(this));
  }
  
  addMarker = () => {    
    firebase.database()
      .ref('places/').push().set({
        lat: Number(this.state.lat),
        lng: Number(this.state.lng)
      });    
  }

  handleChangeLat = (event) => {
    this.setState({lat: event.target.value});
  }

  handleChangeLng = (event) => {
    this.setState({lng: event.target.value});
  }

  render() {
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '500px', position: 'relative', width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
          places={this.state.places}
        />
        <hr/>
        Lat: <input type="text" value={this.state.lat} onChange={this.handleChangeLat}/>
        <br />
        Lgn: <input type="text" value={this.state.lng} onChange={this.handleChangeLng}/>
        <br />
        <button onClick={this.addMarker}>enter</button>
      </div>
    );
  }
}


export default GMap
