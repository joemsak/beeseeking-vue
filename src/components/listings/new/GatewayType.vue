<template>
  <div class="container">
    <div class="step-indicator">
      Step 4 of 4
    </div>

    The area is accessible via...

    <listing-inputs
      :list="gatewayTypes"
      other-placeholder="Some other way..."
      v-model="gatewayType"
    />

    ...during the following times...

    <listing-inputs
      :list="hoursAccessibleOptions"
      other-placeholder="Something else..."
      v-model="hoursAccessible"
    />

    <div class="row justify-content-between">
      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing-number-of-hives' }"
      >
        Back: Number of hives
      </router-link>

      <button
        class="btn btn-sm btn-primary"
        @click="saveListing"
      >
        Finished: Save this listing
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListingInputs from '@/components/ListingInputs'

export default {
  data () {
    return {
      gatewayType: '',
      gatewayTypes: [
        'a locked fence',
        'an unlocked fence',
        'a building',
        'stairs',
        'a ladder',
        'an elevator',
      ],

      hoursAccessible: '',
      hoursAccessibleOptions: [
        '24 hours a day',
        'on weekends',
        'on weekdays',
      ],
    }
  },

  computed: mapState(['newListing']),

  components: {
    ListingInputs,
  },

  watch: {
    gatewayType () {
      if (this.gatewayType.length) this.gatewayTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        gatewayType: this.gatewayType,
      })
    },

    hoursAccessible () {
      if (this.hoursAccessible.length) this.hoursAccessibleOther = ''

      this.$store.dispatch('updateNewListingProps', {
        hoursAccessible: this.hoursAccessible,
      })
    },
  },

  methods: {
    saveListing () {
      this.$store.dispatch('saveNewListing').then(() => {
        this.$router.push({ name: 'listings' })
      })
    },
  },

  mounted () {
    this.gatewayType = this.newListing.gatewayType
    this.hoursAccessible = this.newListing.hoursAccessible
  },
}
</script>