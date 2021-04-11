import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBa6qrdSWBEW0m0H-M-nPJ_wy7MfinsmfU",
    authDomain: "react-app-curso-maximo.firebaseapp.com",
    projectId: "react-app-curso-maximo",
    storageBucket: "react-app-curso-maximo.appspot.com",
    messagingSenderId: "253411360734",
    appId: "1:253411360734:web:6a36e08f8b1dc49b2ca74f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
  db,
  googleAuthProvider,
  firebase
}