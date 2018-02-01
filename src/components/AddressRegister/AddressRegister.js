import React, { Component } from 'react'

class AddressRegister extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
  }

  // ------------------------------
  // ------------------------------
  // ------------------------------

  loadJS(src) {
    console.log('loadJS')    
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    ref.parentNode.insertBefore(script, ref);
  }

  geolocate() {
    console.log('geolocate')
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

  fillInAddress() {
    let place = this.autocomplete.getPlace()
    console.log('fillInAddress', place)
  }

  // ------------------------------
  // ------------------------------
  // ------------------------------

  initAutocomplete() {
    console.log('initAutocomplete');
    this.autocomplete = new window.google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')), 
      {types: ['geocode']}
    );
    this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
  }

  componentDidMount() {
    console.log('componentDidMount')
    window.initAutocomplete = this.initAutocomplete.bind(this);
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&libraries=places&callback=initAutocomplete')
  }

  render () {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <h2>AddressRegister</h2>
        <input id="autocomplete" 
          placeholder="Enter your address"
          type="text"></input>
        <br/>
        <br/>
        <br/>        
      </div>
    ) 
  }
}

export default AddressRegister
