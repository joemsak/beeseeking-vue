<template>
  <div class="with-backpage">
    <router-link :to="{ name: 'listings' }" tag="nav" id="backpage">
      <span>Listings</span>
    </router-link>

    <div class="container new-listing">
      <h1>List your space</h1>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListYourSpace',

  data () {
    return {
      place: '',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .new-listing {
    padding: 1rem;
  }

  h1 {
    font-size: 1.2rem;
  }
</style>