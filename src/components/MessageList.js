import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: {
                username: " ",
                content: " ",
                roomId: " ",
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            }
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount () {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) })
        });
    }

//    handleChange(e) {
//        e.preventDefault();
//        this.setState({
//          username: this.props.currentUser.displayName,
//          content: e.target.value,
//          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
//          roomId: this.props.activeRoom.key
//        });
//    }

    render () {
        return (
            <section className="message-list">
                <ul>
                    { this.state.messages.map ( (message, index) => {
                        if (this.props.activeRoom && this.props.activeRoom === message.roomId) {
                            return <li key={index}>{message.username}: {message.content} {message.sentAt}</li>
                      } 
                    })}
                </ul>
            </section>
        );
    }

}

export default MessageList;