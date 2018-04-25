<template>
  <div class="container">
    <div class="step-indicator">
      Step 1 of 4
    </div>

    My property is a...

    <listing-inputs
      :other-chosen="propertyTypeOther.length"
      :list="propertyTypes"
      v-model="propertyType"
    >
      <input
        type="text"
        placeholder="Something else..."
        v-model="propertyTypeOther"
      />
    </listing-inputs>

    ...and it is a...

    <listing-inputs
      :other-chosen="privacyTypeOther.length"
      :list="privacyTypes"
      v-model="privacyType"
    >
      <input
        type="text"
        placeholder="Best described some other way"
        v-model="privacyTypeOther"
      />
    </listing-inputs>

    ...on the...

    <listing-inputs
      :other-chosen="accessTypeOther.length"
      :list="accessTypes"
      v-model="accessType"
    >
      <input
        type="text"
        placeholder="Some other structure"
        v-model="accessTypeOther"
      />
    </listing-inputs>

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
      propertyTypeOther: '',
      propertyTypes: [
        'Farm',
        'Backyard or Lawn',
        'Community Garden',
        'Building',
      ],

      privacyType: '',
      privacyTypeOther: '',
      privacyTypes: [
        'Public space',
        'Private space',
      ],

      accessType: '',
      accessTypeOther: '',
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
    propertyTypeOther () {
      if (this.propertyTypeOther.length) this.propertyType = ''

      this.$store.dispatch('updateNewListingProps', {
        propertyTypeOther: this.propertyTypeOther,
      })
    },

    propertyType () {
      if (this.propertyType.length) this.propertyTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        propertyType: this.propertyType,
      })
    },

    privacyTypeOther () {
      if (this.privacyTypeOther.length) this.privacyType = ''

      this.$store.dispatch('updateNewListingProps', {
        privacyTypeOther: this.privacyTypeOther,
      })
    },

    privacyType () {
      if (this.privacyType.length) this.privacyTypeOther = ''

      this.$store.dispatch('updateNewListingProps', {
        privacyType: this.privacyType,
      })
    },

    accessTypeOther () {
      if (this.accessTypeOther.length) this.accessType = ''

      this.$store.dispatch('updateNewListingProps', {
        accessTypeOther: this.accessTypeOther,
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
    this.propertyTypeOther = this.newListing.propertyTypeOther

    this.privacyType = this.newListing.privacyType
    this.privacyTypeOther = this.newListing.privacyTypeOther

    this.accessType = this.newListing.accessType
    this.accessTypeOther = this.newListing.accessTypeOther
  },
}
</script>