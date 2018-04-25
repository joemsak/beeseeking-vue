// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase from 'firebase'

import Vue from 'vue'

import App from './App'
import SignIn from './SignIn'

import { guest } from '@/db/firebaseConfig'

import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',

  data: {
    appReady: false,
    currentUser: { guest: true },
  },

  router,
  store,
  components: {
     App,
     SignIn,
  },
  template: '<App v-if="appReady && !currentUser.guest" /><SignIn v-else />',

  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      this.appReady = false

      if (user) {
        this.$store.dispatch(
          'initApp',
          { currentUser: user }
        ).then(() => {
          this.appReady = true
          this.currentUser = user
        })
      } else {
        this.$store.dispatch(
          'initApp',
          { currentUser: guest }
        ).then(() => {
          this.appReady = true
          this.currentUser = guest
        })
      }
    })
  }
})
