import React, { Component } from 'react'
import firebase from 'firebase'


class MyGMapComponent extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
  }

  initMap() {
    console.log('initMap')
    window.map = new window.google.maps.Map(document.getElementById('MyGMapComponent'), {
      // center: {lat: -23.001, lng: -47.001},
      zoom: 18
    });

    const infoWindow = new window.google.maps.InfoWindow({map: window.map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Você está aqui seu bosta!');
        window.map.setCenter(pos);
      }, function() {
        this.handleLocationError(true, infoWindow, window.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, window.map.getCenter());
    }

  }


  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

  loadJS(src) {
    console.log('loadJS')
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    ref.parentNode.insertBefore(script, ref);
  }

  componentWillMount () {
    console.log('componentWillMount')
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

  componentDidMount() {
    console.log('componentDidMount')    
    window.initMap = this.initMap;
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&callback=initMap')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
    nextState.places.map((item) => {
      new window.google.maps.Marker({
        position: {lat: item.lat, lng: item.lng},
        map: window.map
      });
    })
  }





  render() {
    return(
      <div>
        <h1>MyGMapComponent</h1>
        <div id="MyGMapComponent" style={{ border:'solid 10px black', height:'600px' }}></div>
      </div>
    )
  }
}

export default MyGMapComponent
