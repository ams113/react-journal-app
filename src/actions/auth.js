import { types } from "../types/types"
import Swal from 'sweetalert2'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { startLoading, finishLoading } from '../actions/ui'
import { notesLogout } from "./notes";

//? envolver con () es lo mismo que usar return
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout,
});

export const startGoogleLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => dispatch(
                login(user.uid, user.displayName)
            ))
            .catch( error => {
                console.log(error);
                Swal.fire('Error', error.message, 'error');
            })
    }
}

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(  startLoading() );
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( async ({ user }) => {

                dispatch( login(user.uid, user.displayName) );
                dispatch(  finishLoading() );
            })
            .catch( error => {
                console.log(error);
                dispatch(  finishLoading() );
                Swal.fire('Error', error.message, 'error')
            });
    }
}

export const startRegisterCustom = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {

               await user.updateProfile({ displayName: name })

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( error => {
                console.log(error);
                Swal.fire('Error', error.message, 'error')
            });
    }
}
export const startLogout = (email, password, name) => {
    return async(dispatch) => {

        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( notesLogout() );

    }
}


