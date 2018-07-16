import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import fbConnection from '../firebaseRequests/connection';

fbConnection();
class App extends Component {
  render () {
    if (firebase.apps.length) {
      console.error('Firebase Initialized!');
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="btn btn-danger">Bootstrap?</button>
      </div>
    );
  }
}

export default App;
