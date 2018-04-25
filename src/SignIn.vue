<template>
  <button @click="handleGoogle">Sign in with Google</button>
</template>

<script>
import firebase from 'firebase'
import { auth_providers } from '@/db/firebaseConfig'

export default {
  methods: {
    handleGoogle () {
      firebase.auth().signInWithPopup(auth_providers.google).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
  },
}
</script>