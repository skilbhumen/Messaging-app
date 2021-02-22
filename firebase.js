import firebase from 'firebase';
// import * as firebase from 'firebase';

import  "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBtRF5QI7BMsCAnZJBwUJdojHwNTBL_aKg",
  authDomain: "dev-signal-build-e89e1.firebaseapp.com",
  projectId: "dev-signal-build-e89e1",
  storageBucket: "dev-signal-build-e89e1.appspot.com",
  messagingSenderId: "8658218420",
  appId: "1:8658218420:web:ca076aea5189958c47d6e1"
};
  
  let app;

  if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { auth, db};
