import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase'

import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';


var config = {
  apiKey: "AIzaSyCA7zQkRM4WxQjpsdsujnLxl7IPBgTZxrc",
  authDomain: "fir-samples.firebaseapp.com",
  databaseURL: "https://fir-samples.firebaseio.com",
  projectId: "fir-samples",
  storageBucket: "fir-samples.appspot.com",
  messagingSenderId: "650933171461"
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
