import Vue from 'vue'
import Router from 'vue-router'

import Listings from '@/components/listings'

import NewListing from '@/components/listings/new'
import PropertyType from '@/components/listings/new/PropertyType'
import Place from '@/components/listings/new/Place'
import NumberOfHives from '@/components/listings/new/NumberOfHives'
import GatewayType from '@/components/listings/new/GatewayType'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'listings',
      component: Listings,
    },
    {
      path: '/listings/new',
      component: NewListing,
      children: [
        {
          path: '',
          name: 'new-listing',
          component: PropertyType,
        },
        {
          path: 'place',
          name: 'new-listing-place',
          component: Place,
        },
        {
          path: 'number-of-hives',
          name: 'new-listing-number-of-hives',
          component: NumberOfHives,
        },
        {
          path: 'gateway-type',
          name: 'new-listing-gateway-type',
          component: GatewayType,
        },
      ],
    },
  ]
})
