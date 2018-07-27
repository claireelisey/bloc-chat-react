import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: [],
            newRoomName: " "
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);

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
            </section>
        );
    }
}

export default RoomList;