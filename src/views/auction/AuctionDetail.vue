<template>
  <div v-if="auction">
    <div class="event-header">
      <div class="buttons">
        <BaseDeleteButton @delete-clicked="deleteAuction" />
        <BaseUpdateButton @update-clicked="updateAuction" />
      </div>
      <h2>{{ auction.name }}</h2>
      <span class="eyebrow">{{ date(auction.start) }} until {{ date(auction.end) }}</span>
      <br />
      <br />
      <BaseIcon name="map-pin" />
      <span class="eyebrow">{{ auction.location }}</span>
    </div>
    <BaseIcon name="user">
      <h5>Organized by</h5>
    </BaseIcon>
    <ul class="list-group">
      <li v-for="organiser in organisers" :key="organiser.id" class="list-item">
        <p>{{ organiser.name }}</p>
      </li>
    </ul>
    <BaseIcon name="clock">
      <h5>Deadlines</h5>
    </BaseIcon>
    <p>You can add offers until {{ date(auction.deadlineOffers) }}</p>
    <p>You can add/change products until {{ date(auction.deadlineProducts) }}</p>
    <div class="container">
      <BaseIcon name="package">
        <h5>Products</h5>
      </BaseIcon>
      <BaseAddButton
        text="Add Product"
        :navigation="{
          name: 'product-create',
          params: { auctionUrl: this.auction.url }
        }"
      />
    </div>
    <ProductCard v-for="product in products" :key="product.url" :product="product" />
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import moment from 'moment'
import ProductCard from '@/components/product/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      auction: null,
      organisers: [],
      products: []
    }
  },
  created() {
    AxiosService.getType('auction', this.$route.params.id)
    .then(res => {
      this.auction = res.data
      this.auction.organisers.forEach(organiserUrl => {
      AxiosService.get(organiserUrl)
        .then(response => {
          this.organisers.push(response.data)
        })
        .catch(error => {
          console.log('There is an error:' + error.response)
        })
    })
    this.auction.products.forEach(url => {
      AxiosService.get(url)
        .then(response => {
          this.products.push(response.data)
        })
        .catch(error => {
          console.log('There is an error:' + error.response)
        })
    })

    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    date: function(date) {
      return moment(date).format('MMMM Do YYYY, hh:mm')
    },
    deleteAuction: function() {
       AxiosService.delete(this.auction.url)
       this.$router.push({
        name: 'auction-list'
      })
    },
    updateAuction: function() {
      this.$router.push({
        name: 'auction-update',
        params: { auction: this.auction }
      })
    }
  }
}
</script>

<style scoped>
.buttons {
  float: right;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0px;
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
