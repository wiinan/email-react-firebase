import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADhGV0QdGhKefHSPOjkUPs9ctZUNPn-lM",
    authDomain: "g-m-clone.firebaseapp.com",
    projectId: "g-m-clone",
    storageBucket: "g-m-clone.appspot.com",
    messagingSenderId: "411814675753",
    appId: "1:411814675753:web:b8ab2dbc7d31e23b4f6338"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();