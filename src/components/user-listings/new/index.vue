<template>
  <div class="row">
    <div class="col-sm-10">
      <div class="with-backpage">
        <router-link :to="{ name: 'listings' }" tag="nav" id="backpage">
          <span>Your Listings</span>
        </router-link>

        <div class="container new-listing">
          <h1>List your space</h1>
          <router-view></router-view>
        </div>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="container new-listing__details">
        <dl>
          <dt>Property:</dt>
          <dd>{{ newListing.propertyType }}</dd>

          <dt>Privacy:</dt>
          <dd>{{ newListing.privacyType }}</dd>

          <dt>Access:</dt>
          <dd>{{ newListing.accessType }}</dd>

          <dt>Place:</dt>
          <dd>{{ newListing.place }}</dd>

          <dt># of Hives:</dt>
          <dd>{{ newListing.numberOfHives }}</dd>

          <dt>Gateway:</dt>
          <dd>{{ newListing.gatewayType }}</dd>

          <dt>Hours:</dt>
          <dd>{{ newListing.hoursAccessible }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListYourSpace',

  data () {
    return {
      place: '',
    }
  },

  computed: mapState(['newListing']),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .new-listing,
  .new-listing__details {
    padding: 1rem;
  }

  h1 {
    font-size: 1.2rem;
  }
</style>