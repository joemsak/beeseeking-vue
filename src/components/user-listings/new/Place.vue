<template>
  <div class="container">
    <div class="step-indicator">
      Step 2 of 4
    </div>

    It is located in...

    <div class="alert alert-light">
      (you don't have to be specific if you don't want to be)
    </div>

    <p>((( a searchable google map goes here, with geolocation )))</p>

    <div class="row justify-content-between">
      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing' }"
      >
        Back: Property type
      </router-link>

      <router-link
        class="btn btn-sm btn-primary"
        :to="{ name: 'new-listing-number-of-hives' }"
      >
        Next: Number of hives
      </router-link>
    </div>
  </div>
</template>