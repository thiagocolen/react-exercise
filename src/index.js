import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
