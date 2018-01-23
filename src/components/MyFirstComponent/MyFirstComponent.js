import React, { Component } from 'react'
import './MyFirstComponent.css'
import * as firebase from 'firebase'
import reactfire from 'reactfire'


class MyFirstComponent extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
  }
  
  componentDidMount() {

    this.firebaseRef = firebase.database().ref('places/');

    let log = this.firebaseRef.once
    console.log(log);

    this.firebaseRef.on("child_added", function(dataSnapshot) {

      console.log(dataSnapshot.val())
      // this.items.push(dataSnapshot.val());
      // this.setState({
      //   items: this.items
      // });

    }.bind(this));


        
    // firebase.database().ref('places/').push().set({
    //   username: 'thiago',
    //   email: 'thiagomail'
    // });

  
    // firebase.database().ref('/places/').once('value').then(function(snapshot) {
    //   let teste = snapshot.val()
    //   console.log(teste)
    // });    
  }


  render() {
    return (
      <div>
        <div className="myFirstComponentClass">
          <h1>My First Component</h1>
          {/* <h2>{this.state.total}</h2> */}
          <h2>{this.props.teste}</h2>      
        </div>
      </div>
    );
  }
}

export default MyFirstComponent;
