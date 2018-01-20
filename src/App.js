import React, { Component } from 'react';
import './App.css';

import MyFirstComponent
  from './components/MyFirstComponent/MyFirstComponent'

import Map 
  from './components/Map/Map'



class App extends Component {
  render() {
    return (
      <div>
        <h1>teste</h1>
        <MyFirstComponent />
        <hr/>
        <Map />
      </div>
    );
  }
}

export default App
