import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: " ",
      user: " "
    }

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);

  }

  setActiveRoom (room) {
    this.setState(
      {
        activeRoom: room
      }
    );
  }

  setUser (user) {
    this.setState(
      {
        user: user
      }
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <h2>Available Rooms:</h2>
        <RoomList 
          firebase= { firebase }
          setActiveRoom={ this.setActiveRoom }
        />
        <MessageList 
          firebase= { firebase }
          activeRoom= { this.state.activeRoom }
          messages= { this.state.messages }
          currentUser= { this.state.user }
        />
        <User
          firebase= { firebase }
          setUser= { this.setUser }
          currentUser= { this.state.user }
        /> 
      </div>
    );
  }
}

export default App;
