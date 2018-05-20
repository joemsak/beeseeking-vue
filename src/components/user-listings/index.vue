<template>
  <div>
    <router-link
      :to="{ name: 'new-listing' }"
      class="btn btn-primary"
    >
      List your space
    </router-link>

    {{ currentUser.displayName }}

    <a :href="`mailto:${currentSecureEmail}`">{{ currentSecureEmail }}</a>

    <a @click.prevent="logout">Log out</a>

    <h2>Your Listings</h2>

    <div>
      <div
        class="listing-item"
        v-for="listing in userListings"
        :key="listing['.key']"
      >
        <dl>
          <dt>Property</dt>
          <dd>{{ listing.propertyType }} ({{ listing.privacyType }})</dd>

          <dt>Fits</dt>
          <dd>{{ listing.numberOfHives }} hives</dd>

          <dt>Location</dt>
          <dd>{{ listing.place }}</dd>
        </dl>

        <dl>
          <dt>Access</dt>
          <dd>{{ listing.accessType }} with {{ listing.gatewayType }}</dd>

          <dt>Hours available</dt>
          <dd>{{ listing.hoursAccessible }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  computed: {
    ...mapState(['userListings', 'currentUser']),
    ...mapGetters(['currentSecureEmail']),
  },

  methods: {
    logout () {
      firebase.auth().signOut()
    },
  },
}
</script>

<style lang="scss" scoped>
.listing-item {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  padding: 1rem;
}

a {
  cursor: pointer;
}
</style>