import firebase from 'firebase';


var firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBVyX4knEKMwR73o5M-5AYTZ-TIp68jO2M",
        authDomain: "jijilike-de7ed.firebaseapp.com",
        projectId: "jijilike-de7ed",
        storageBucket: "jijilike-de7ed.appspot.com",
        messagingSenderId: "848711158168",
        appId: "1:848711158168:web:0bc5d0ab57af16117403ed",
        measurementId: "G-NWJQNSGBXG"
});
export var db =firebaseApp.firestore();
