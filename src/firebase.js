import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyADxKB9BAzawXtgGG9-A8tQR6jwZD_onC0",
    authDomain: "mini-bank-8b52a.firebaseapp.com",
    databaseURL: "https://mini-bank-8b52a.firebaseio.com",
    projectId: "mini-bank-8b52a",
    storageBucket: "mini-bank-8b52a.appspot.com",
    messagingSenderId: "1077094499114",
    appId: "1:1077094499114:web:e04f2be45ccb7ac2175453",
    measurementId: "G-E0QZEEBMRW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase