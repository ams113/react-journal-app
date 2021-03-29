import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
        apiKey: "AIzaSyC7cozstYHZ7_9LwIosuaR3XIR4MNvapDE",
        authDomain: "react-apps-crj.firebaseapp.com",
        projectId: "react-apps-crj",
        storageBucket: "react-apps-crj.appspot.com",
        messagingSenderId: "187036981714",
        appId: "1:187036981714:web:61e1cba64de3abc791500b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}