var firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyDfcdrokrsipmUpWzHmhv_EjglsPypLnM8",
  authDomain: "quickadder.firebaseapp.com",
  databaseURL: "https://quickadder.firebaseio.com",
  storageBucket: "quickadder.appspot.com",
  serviceAccount: require("./credentials.json")
});

module.exports = firebase;
