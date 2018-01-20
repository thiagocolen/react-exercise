import React, { Component } from 'react';
import './MyFirstComponent.css';


const myStyle = {
  color: 'green',
}


class MyFirstComponent extends Component {  
  render() {
    return (
      <div className="myFirstComponentClass">
        <h1 style={myStyle}>My First Component</h1>      
      </div>
    );
  }
}

export default MyFirstComponent;
