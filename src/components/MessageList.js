import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: {
                username: '',
                content: '',
                roomId: '',
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            },
            newMessageContent: " "
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.createMessage = this.createMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount () {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) })
        });
    }

    createMessage(newMessageContent) {
        this.messagesRef.push(
            {
                content: newMessageContent,
                username: this.props.currentUser.displayName,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                roomId: this.props.activeRoom
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newMessageContent !== " ") {
            this.createMessage (this.state.newMessageContent);
            this.setState (
                {
                    newMessageContent: " ",
                    username: " "
                }
            );
        }
    }

    handleChange(e){
        this.setState(
            {
                newMessageContent: e.target.value,
                username: this.props.currentUser.displayName
            }
        );
    }

    render () {
        return (
            <section className="message-list">
                <ul>
                    { this.state.messages.map ( (message, index) => {
                        if (this.props.activeRoom && this.props.activeRoom === message.roomId) {
                            return <li key={index}>{message.username}: {message.content} {message.sentAt}</li>
                        } else {
                          return null
                        }
                    })}
                </ul>
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <input type="text"
                        value= { this.state.newMessageContent }
                        placeholder= "Enter your message..."
                        onChange= { this.handleChange } />
                    <input type="submit" value="submit" />
                </form>
            </section>
        );
    }

}

export default MessageList;