<template>
  <div class="container">
    <div class="step-indicator">
      Step 4 of 4
    </div>

    The area is accessible via...

    <listing-inputs
      :other-chosen="gatewayTypeOther.length"
      :list="gatewayTypes"
      v-model="gatewayType"
    >
      <input
        type="text"
        placeholder="Some other way..."
        v-model="gatewayTypeOther"
      />
    </listing-inputs>

    ...during the following times...

    <listing-inputs
      :other-chosen="hoursAccessibleOther.length"
      :list="hoursAccessibleOptions"
      v-model="hoursAccessible"
    >
      <input
        type="text"
        placeholder="Something else..."
        v-model="hoursAccessibleOther"
      />
    </listing-inputs>

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
      gatewayTypeOther: '',
      gatewayTypes: [
        'a locked fence',
        'an unlocked fence',
        'a building',
        'stairs',
        'a ladder',
        'an elevator',
      ],

      hoursAccessible: '',
      hoursAccessibleOther: '',
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
    gatewayTypeOther () {
      if (this.gatewayTypeOther.length) this.gatewayType = ''

      this.$store.dispatch('updateNewListingProps', {
        gatewayTypeOther: this.gatewayTypeOther,
      })
    },

    gatewayType () {
      if (this.gatewayType.length) this.gatewayTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        gatewayType: this.gatewayType,
      })
    },

     hoursAccessibleOther () {
      if (this.hoursAccessibleOther.length) this.hoursAccessible = ''

      this.$store.dispatch('updateNewListingProps', {
        hoursAccessibleOther: this.hoursAccessibleOther,
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
    this.gatewayTypeOther = this.newListing.gatewayTypeOther

    this.hoursAccessible = this.newListing.hoursAccessible
    this.hoursAccessibleOther = this.newListing.hoursAccessibleOther
  },
}
</script>