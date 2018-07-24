import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: []
        };
        
        this.roomsRef = this.props.firebase.database().ref('rooms');

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    createRoom(e) {
        e.preventDefault();
        if(!this.state.newRoomName) {
          return
        }
        else {
            this.roomsRef.push( {name: this.state.newRoomName});
            this.setState( {newRoomName: ""} )
        }
      }

      handleChange(e){
        this.setState(
          {newRoomName: e.target.value}
        );
    }

    render() {
        return (
            <div className="room-list">
                <ul>
                    { this.state.rooms.map( (room, index) =>
                        <li key={index}>{ room.name }</li>
                    )}
                </ul>
                <form onSubmit={ (e) => this.createRoom(e) }>
                    <input type="text" value={ this.state.newRoomName } placeholder="Enter a new room name." onChange={ (e) => this.handleChange(e) } />
                    <input type="submit" value="Create New Room" />
                </form>  
            </div>
        );
    }
}

export default RoomList;