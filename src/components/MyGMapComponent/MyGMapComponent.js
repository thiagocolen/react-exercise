import React, { Component } from 'react'
import firebase from 'firebase'

class MyGMapComponent extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
  }

  //--------------------------------
  //--------------------------------
  //--------------------------------

  loadJS(src) {
    console.log('loadJS')    
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    ref.parentNode.insertBefore(script, ref);
  }

  initMap() {
    console.log('initMap')
    this.map = new window.google.maps.Map(document.getElementById('MyGMapComponent'), {
      // center: {lat: -20.001, lng: -47.001},
      zoom: 14
    });
    
    this.initGeolocation()
    this.initAutocomplete()
  }

  initGeolocation() {
    console.log('initInfoWindow')

    const successCallback = (position) => { 
      this.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      infoWindow.setPosition(this.currentPosition);
      infoWindow.setContent('Você está aqui seu bosta!');        
      this.map.setCenter(this.currentPosition);   
    }

    const errorCallback = () => {
      handleLocationError(true, infoWindow, this.map.getCenter());      
    }

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      console.log('handleLocationError')
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }
  
    const infoWindow = new window.google.maps.InfoWindow({map: this.map});

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  initAutocomplete() {
    console.log('initAutocomplete');
    // Create the autocomplete object, restricting the search to geographical location types.
    this.autocomplete = new window.google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')), 
      {types: ['geocode']}
    );

    // When the user selects an address from the dropdown, populate the address fields in the form.
    this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
  }
      
  // renomear, isso tá estranho
  fillInAddress() {
    var place = this.autocomplete.getPlace();

    this.setState({
      addressPosition: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    });
  }

  geolocate() {
    const successCallback = (position) => {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new window.google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      this.autocomplete.setBounds(circle.getBounds());
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback);
    }
  }

  //--------------------------------
  //--------------------------------
  //--------------------------------

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
    window.initMap = this.initMap.bind(this);
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&libraries=places&callback=initMap')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextState.addressPosition)

    // todo: pegar os places do firebase    
    // nextState.places.map((item) => {
    //   new window.google.maps.Marker({
    //     position: {lat: item.lat, lng: item.lng},
    //     map: window.map
    //   });
    // })

    if (nextState.addressPosition) {
      this.addressPosition = {
        lat: nextState.addressPosition.lat,
        lng: nextState.addressPosition.lng
      }
  
      const infoWindow = new window.google.maps.InfoWindow({map: this.map});    
      infoWindow.setPosition(this.addressPosition);
      infoWindow.setContent('Agora você está aqui seu cuzão!');        
      this.map.setCenter(this.addressPosition);
    }


  }

  render() {
    return(
      <div>
        <div id="MyGMapComponent" 
          style={{ border:'solid 20px black', height:'600px' }}></div>
        <br/>
        <input id="autocomplete" 
          placeholder="Enter your address"
          onFocus={this.geolocate()} 
          type="text"
          style={{ height:'30px', width:'400px' }}></input>
      </div>
    )
  }
}

export default MyGMapComponent
