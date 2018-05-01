
  import firebase from 'firebase';
  import cfg from './cfg';
  const config = {
    apiKey: cfg.API,
    authDomain: cfg.AUTH,
    databaseURL: "https://zero-2-app.firebaseio.com",
    projectId: "zero-2-app",
    storageBucket: "",
    messagingSenderId: cfg.MSG
  };
  var fire=firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;