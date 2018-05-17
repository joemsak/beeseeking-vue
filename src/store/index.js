import Vue from 'vue'
import Vuex from 'vuex'

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

    listings: [],
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
        numberOfHivesOther: '',

        hoursAccessible: '',
        hoursAccessibleOther: '',

        gatewayType: '',
        gatewayTypeOther: '',

        accessType: '',
        accessTypeOther: '',

        privacyType: '',
        privacyTypeOther: '',

        propertyType: '',
        propertyTypeOther: '',
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

      listing.propertyType = listing.propertyType || listing.propertyTypeOther
      listing.privacyType = listing.privacyType || listing.privacyTypeOther
      listing.gatewayType = listing.gatewayType || listing.gatewayTypeOther
      listing.accessType = listing.accessType || listing.accessTypeOther
      listing.hoursAccessible = listing.hoursAccessible || listing.hoursAccessibleOther
      listing.numberOfHives = listing.numberOfHives || listing.numberOfHivesOther

      db.ref('listings').push(listing)
      commit('resetNewListing')
    },

    initApp: firebaseAction(({ bindFirebaseRef, commit }, payload) => {
      commit('currentUser', payload.currentUser)
      bindFirebaseRef('listings', db.ref('listings'))
    }),
  },
})