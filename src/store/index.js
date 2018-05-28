import Vue from 'vue'
import Vuex from 'vuex'

import secureRandom from 'secure-random'

import { firebaseAction, firebaseMutations } from 'vuexfire'

import { db } from '@/db/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: false,

    newListing: {
      place: '',
      numberOfHives: '',
      hoursAccessible: '',
      gatewayType: '',
      accessType: '',
      privacyType: '',
      propertyType: '',
    },

    userKeys: null,

    userListings: [],
  },

  getters: {
    currentSecureEmail (state) {
      if (!!state.userKeys) {
        return `listing+${state.userKeys.email}@beeseeking.com`
      } else {
        return ''
      }
    },
  },

  mutations: {
    currentUser (state, user) {
      state.currentUser = user
    },

    newListingProps (state, payload) {
      let modifiedNewListing = Object.assign({}, state.newListing)

      Object.keys(payload).forEach(k => {
        modifiedNewListing[k] = payload[k]
      })

      state.newListing = modifiedNewListing
    },

    resetNewListing (state) {
      state.newListing = {
        place: '',
        numberOfHives: '',
        hoursAccessible: '',
        gatewayType: '',
        accessType: '',
        privacyType: '',
        propertyType: '',
      }
    },

    ...firebaseMutations,
  },

  actions: {
    updateNewListingProps ({ commit }, payload) {
      commit('newListingProps', payload)
    },

    saveNewListing ({ commit, state }) {
      let listing = Object.assign({}, state.newListing)
      db.ref(`listings/${state.currentUser.uid}`).push(listing)
      commit('resetNewListing')
    },

    initApp: firebaseAction(({ bindFirebaseRef, commit, state }, payload) => {
      commit('currentUser', payload.currentUser)

      bindFirebaseRef('userListings', db.ref(`listings/${state.currentUser.uid}`))

      bindFirebaseRef('userKeys', db.ref(`keys/${state.currentUser.uid}`), {
        readyCallback: () => {
          if (!state.userKeys || !state.userKeys.email) {
            const data = secureRandom.randomBuffer(10)
            const emailHex = data.toString('hex')

            db.ref(`keys/${state.currentUser.uid}`).set({
              email: emailHex,
            })

            db.ref(`emailKeys/${emailHex}`).set(state.currentUser.uid)
          }
        },
      })
    }),
  },
})