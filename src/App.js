import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import MyFirstComponent from './components/MyFirstComponent/MyFirstComponent'
import Map from './components/Map/Map'
import './App.css'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCA7zQkRM4WxQjpsdsujnLxl7IPBgTZxrc",
  authDomain: "fir-samples.firebaseapp.com",
  databaseURL: "https://fir-samples.firebaseio.com",
  projectId: "fir-samples",
  storageBucket: "fir-samples.appspot.com",
  messagingSenderId: "650933171461"
}

firebase.initializeApp(config)

firebase.database().ref('/users/').once('value').then(function(snapshot) {
  console.log(snapshot.val().gRLIkOlNbNOdTZOuMlA1N5Tij4e2.username)
});


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  vasefudeporra = () => { console.log('vasefudeporra'); }
  
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>  
          <div>
            <AppBar 
              title="React Exercise" 
              onLeftIconButtonClick={this.handleToggle}
            />

            <Drawer
              docked={false}
              width={300}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <Link to={'/'}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>            
              <Link to={'/link1'}><MenuItem onClick={this.handleClose}>My First Component</MenuItem></Link>
              <Link to={'/link2'}><MenuItem onClick={this.handleClose}>Map Component</MenuItem></Link>
            </Drawer>

            <Route exact path="/" component={wellcome}/>
            <Route path="/link1" component={MyFirstComponent} />
            <Route path="/link2" component={myMap} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const wellcome = () => {
  return (
    <h1>Wellcome</h1>
  )
}

const myMap = ({match}) => {
  return(
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCv0MDuPwY5ruP5YWb9fvdaT0Ha63fhSN8&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default App
