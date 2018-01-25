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
    console.log('componentDidMount');
  }


  componentWillMount () {
    console.log('componentWillMount');
    let teste = firebase.database().ref('places/');

    teste.limitToLast(25).on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        items.push(childSnapshot.val());
      });

      this.setState({
        places: items
      });
    }.bind(this));
  }


  render() {
    return (
      <div>
        <div className="myFirstComponentClass">
          <h1>My First Component</h1>
          <h2>this.props.teste: {this.props.teste}</h2>

         <List items={this.state.places} />

        </div>
      </div>
    );
  }
}


const List = (props) => {

  const listItems = props.items.map((item, index) =>
    <li key={index}>
      <h2>{item.email}</h2>
      <h3>{item.username}</h3>
    </li>
  );

  return (
    <ul>{listItems}</ul>
  )
}


export default MyFirstComponent;
