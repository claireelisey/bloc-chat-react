import React, { Component } from 'react';

class User extends Component {

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    handleChange(user) {
        const signInStatus = user;
        if (signInStatus) {
            this.signOut();
        } else if (signInStatus === null) {
            this.signIn();
        }
    }

    render() {
        return (
            <section>
                <h4>Hello {(this.props.currentUser) ? this.props.currentUser.displayName : 'Guest'}</h4>
                {(this.props.currentUser) === null ?
                    <button onClick={this.signIn.bind(this)} onChange={(user) => this.handleChange(user)}>Sign In</button>
                    :
                    <button onClick={this.signOut.bind(this)}>Sign Out</button>
                }
            </section>
        );
    }

}

export default User;