$('document').ready(function(){
  var config = {
    apiKey: "AIzaSyDfcdrokrsipmUpWzHmhv_EjglsPypLnM8",
    authDomain: "quickadder.firebaseapp.com",
    databaseURL: "https://quickadder.firebaseio.com",
    storageBucket: "quickadder.appspot.com"
  };

  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

  var authenticateUser = function () {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      swal("Awesome!", "You're logged in!", "success");
      localStorage.user = user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      swal("Bummer!", "We couldn't log you in. Please try again.", "error");
      // ...
    });
  }

  var user = firebase.auth().currentUser;
  if (user || (localStorage.user != null && localStorage.user != undefined)) {
    $(".sign-in-button").hide();
    $(".sign-out-button").show();
    $(".sign-out-button").click(function() {
      localStorage.user = null;
      $(".sign-in-button").show();
      $(".sign-out-button").hide();
    });
  } else {
    $(".sign-in-button").click(authenticateUser);
    $(".sign-out-button").hide();
  }

});
