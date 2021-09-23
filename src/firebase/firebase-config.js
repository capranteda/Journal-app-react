import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAOhgs969VP_xHPn1NP4CugYoTOVXIsRDo",
    authDomain: "react-cursos-7fd98.firebaseapp.com",
    projectId: "react-cursos-7fd98",
    storageBucket: "react-cursos-7fd98.appspot.com",
    messagingSenderId: "226701945748",
    appId: "1:226701945748:web:c7bec758bcf43002747d81"
  };

  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}