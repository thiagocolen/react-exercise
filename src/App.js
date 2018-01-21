import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css'

import MyFirstComponent
  from './components/MyFirstComponent/MyFirstComponent'

import Map 
  from './components/Map/Map'



class App extends Component {
  render() {
    return (
      <BrowserRouter>  
        <div>
          <Link to={'/link1'}><h1>link1</h1></Link>
          <Link to={'/link2'}><h1>link2</h1></Link>
          <hr/>
          <Route path="/link1" component={MyFirstComponent} />
          <Route path="/link2" component={myMap} />


        </div>
      </BrowserRouter>
    );
  }
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


