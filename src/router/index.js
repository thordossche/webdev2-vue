import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'

import AuctionList from '@/views/auction/AuctionList.vue'
import AuctionDetail from '@/views/auction/AuctionDetail.vue'
import AuctionCreate from '@/views/auction/AuctionCreate.vue'
import AuctionUpdate from '@/views/auction/AuctionUpdate.vue'

import UserList from '@/views/user/UserList.vue'
import UserDetail from '@/views/user/UserDetail.vue'
import UserCreate from '@/views/user/UserCreate.vue'
import UserUpdate from '@/views/user/UserUpdate.vue'

import ProductDetail from '@/views/product/ProductDetail.vue'
import ProductCreate from '@/views/product/ProductCreate.vue'
import ProductUpdate from '@/views/product/ProductUpdate.vue'

import OfferCreate from '@/views/offer/OfferCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auctions',
    name: 'auction-list',
    component: AuctionList
  },
  {
    path: '/auction/:id',
    name: 'auction-show',
    component: AuctionDetail,
    props: true
  },
  {
    path: '/auction/create',
    name: 'auction-create',
    component: AuctionCreate
  },
  {
    path: '/auction/update/:id',
    name: 'auction-update',
    component: AuctionUpdate,
    props: true
  },
  {
    path: '/users',
    name: 'user-list',
    component: UserList
  },
  {
    path: '/user/:id',
    name: 'user-show',
    component: UserDetail,
    props: true
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: UserCreate
  },
  {
    path: '/user/update/:id',
    name: 'user-update',
    component: UserUpdate,
    props: true
  },
  {
    path: '/product/:id',
    name: 'product-show',
    component: ProductDetail,
    props: true
  },
  {
    path: '/product/create',
    name: 'product-create',
    component: ProductCreate,
    props: true
  },
  {
    path: '/product/update/:id',
    name: 'product-update',
    component: ProductUpdate,
    props: true
  },
  {
    path: '/offer/create',
    name: 'offer-create',
    component: OfferCreate,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = 'Auctions'
  next()
})
export default router
