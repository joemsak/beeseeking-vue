<template>
  <div class="container">
    <div class="step-indicator">
      Step 3 of 4
    </div>

    I can host...
    <listing-inputs
      :other-chosen="numberOfHivesOther.length"
      :list="numberOfHivesOptions"
      v-model="numberOfHives"
    >
      <input
        type="text"
        placeholder="A specific number..."
        v-model="numberOfHivesOther"
      />
    </listing-inputs>

    <p>Help link to go here - a guide to hive sizes</p>

    <div class="row justify-content-between">
      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing-place' }"
      >
        Back: Location
      </router-link>

      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing-gateway-type' }"
      >
        Next: Access and hours
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListingInputs from '@/components/ListingInputs'

export default {
  data () {
    return {
      numberOfHives: '',
      numberOfHivesOther: '',
      numberOfHivesOptions: [
        'just one',
        '2 or 3',
        '4 or 5',
        '6 or more',
      ],
    }
  },

  computed: mapState(['newListing']),

  components: {
    ListingInputs,
  },

  watch: {
    numberOfHivesOther () {
      if (this.numberOfHivesOther.length) this.numberOfHives = ''

      this.$store.dispatch('updateNewListingProps', {
        numberOfHivesOther: this.numberOfHivesOther,
      })
    },

    numberOfHives () {
      if (this.numberOfHives.length) this.numberOfHivesOther = ''

      this.$store.dispatch('updateNewListingProps', {
        numberOfHives: this.numberOfHives,
      })
    },
  },

  mounted () {
    this.numberOfHives = this.newListing.numberOfHives
    this.numberOfHivesOther = this.newListing.numberOfHivesOther
  },
}
</script>