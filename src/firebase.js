
  import firebase from 'firebase';
  const config = {
    apiKey: "AIzaSyCP4muCuxOvY2ltRkjvr0P5yDWnARrCW1U",
    authDomain: "zero-2-app.firebaseapp.com",
    databaseURL: "https://zero-2-app.firebaseio.com",
    projectId: "zero-2-app",
    storageBucket: "",
    messagingSenderId: "815631548492"
  };
  var fire=firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;