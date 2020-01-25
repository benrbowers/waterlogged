import * as firebase from 'firebase'

// Initialize Firebase.
const config = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR AUTH DOMAIN",
  databaseURL: "YOUR DATABASE URL",
  projectId: "YOUR PROJECT ID",
  storageBucket: "",
  messagingSenderId: "YOUR MESSAGING SENDER ID"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
firebase.auth().useDeviceLanguage()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export {
  auth,
  googleProvider
}