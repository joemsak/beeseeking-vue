<template>
  <div class="container">
    <div class="step-indicator">
      Step 1 of 4
    </div>

    My property is a...

    <listing-inputs
      :list="propertyTypes"
      other-placeholder="Something else..."
      v-model="propertyType"
    />

    ...and it is a...

    <listing-inputs
      :list="privacyTypes"
      other-placeholder="Best described some other way"
      v-model="privacyType"
    />

    ...on the...

    <listing-inputs
      :list="accessTypes"
      other-placeholder="Some other structure"
      v-model="accessType"
    />

    <div class="row justify-content-end">
      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing-place' }"
      >
        Next: Location
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
      propertyType: '',
      propertyTypes: [
        'Farm',
        'Backyard or Lawn',
        'Community Garden',
        'Building',
      ],

      privacyType: '',
      privacyTypes: [
        'Public space',
        'Private space',
      ],

      accessType: '',
      accessTypes: [
        'Ground',
        'Roof',
      ],
    }
  },

  computed: mapState(['newListing']),

  components: {
    ListingInputs,
  },

  watch: {
    propertyType () {
      if (this.propertyType.length) this.propertyTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        propertyType: this.propertyType,
      })
    },

    privacyType () {
      if (this.privacyType.length) this.privacyTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        privacyType: this.privacyType,
      })
    },

    accessType () {
      if (this.accessType.length) this.accessTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        accessType: this.accessType,
      })
    },
  },

  mounted () {
    this.propertyType = this.newListing.propertyType
    this.privacyType = this.newListing.privacyType
    this.accessType = this.newListing.accessType
  },
}
</script>