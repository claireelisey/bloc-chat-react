import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: [],
            newRoomName: " ",
            activeRoom: " "
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);

    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    createRoom(newRoomName) {
        this.roomsRef.push(
            {
                name: newRoomName
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newRoomName !== " ") {
            this.createRoom (this.state.newRoomName);
            this.setState (
                {
                    newRoomName: " "
                }
            );
        }
    }

    handleChange(e){
        this.setState(
            {
                newRoomName: e.target.value
            }
        );
    }

//    function myFunction() {
//        var x = document.getElementById("mySelect");
//        x.remove(x.selectedIndex);
//    }

    deleteRoom() {
        const selectedRoom = this.props.setActiveRoom;
        console.log(selectedRoom);
        selectedRoom.remove(selectedRoom.selectedIndex);
    }

//    deleteRoom(roomKey) {
//        console.log('trying to delete room', roomKey)
//        const room = this.props.firebase.database().ref('rooms' + roomKey);
//       room.remove();
//        const remainRooms= this.state.rooms.filter( room => room.key !== roomKey );
//        this.setState({ rooms: remainRooms});
//    }

//    deleteRoom() {
//        this.roomsRef.child(this.props.activeRoom).remove();
//        const index = this.state.rooms.indexOf(this.props.activeRoom);
//        this.state.rooms.splice(index, 1);
//        this.setState({ rooms: this.state.rooms })
//    }

    render() {
        return (
            <section className="room-list">
                <ul>
                    {
                        this.state.rooms.map( (room, index) =>
                        <li onClick={ () => this.props.setActiveRoom(room.name) } key={ index }> { room.name }</li>
                        )
                    }
                </ul>
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <input type="text" value={ this.state.newRoomName } placeholder="Enter a new room name." onChange={this.handleChange} />
                    <input type="submit" value="Create New Room" />
                </form>
                <button onClick={ () => this.deleteRoom() }>Delete</button>
            </section>
        );
    }
}

export default RoomList;