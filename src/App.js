import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCd3kTs71JCEmSqw-MZSDA2j0L34zDxFeM",
    authDomain: "bloc-chat-react-ea5e3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ea5e3.firebaseio.com",
    projectId: "bloc-chat-react-ea5e3",
    storageBucket: "bloc-chat-react-ea5e3.appspot.com",
    messagingSenderId: "588898768593"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <h2>Available Rooms:</h2> 
        <RoomList firebase= { firebase } />
      </div>
    );
  }
}

export default App;
