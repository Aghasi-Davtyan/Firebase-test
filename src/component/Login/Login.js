import React, { Component } from 'react';
import firebase from '../../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class LogIn extends Component {

    state = {
        isSignedIn: false,
    }


    uiConfig = {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
    }

    render() {

        return (
            <div>
                {this.state.isSignedIn ? (
                    null
                ) : <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()} />
                }
            </div>
        );
    }
}

export default LogIn;