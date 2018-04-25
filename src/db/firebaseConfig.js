import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDvHIfOIYVhmHSVBg7PaSISr3GZa48tRKQ",
  authDomain: "beeseeking-e0c70.firebaseapp.com",
  databaseURL: "https://beeseeking-e0c70.firebaseio.com",
  projectId: "beeseeking-e0c70",
  storageBucket: "beeseeking-e0c70.appspot.com",
  messagingSenderId: "1057093705058"
}

const app = firebase.initializeApp(config)
export const db = app.database()

const Guest = {
  guest: true,
  displayName: 'Guest',
}

export const guest = Object.create(Guest)

const AuthProviders = {
  google: new firebase.auth.GoogleAuthProvider(),
}

export const auth_providers = Object.create(AuthProviders)