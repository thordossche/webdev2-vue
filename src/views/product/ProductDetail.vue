<template>
  <div v-if="product">
    <div class="event-header">
      <div class="buttons">
        <BaseDeleteButton @delete-clicked="deleteProduct" />
        <BaseUpdateButton @update-clicked="updateProduct" />
      </div>
      <h2>{{ product.title }}</h2>
      <BaseIcon name="tag">
        <h5>Starting price: ${{ product.price }}</h5>
      </BaseIcon>
      <p>
      <BaseIcon name="user">
        <h5 v-if="seller">Seller: {{ seller.name }}</h5>
      </BaseIcon>
      </p>
    </div>
    <BaseIcon name="info">
      <h5>Description</h5>
    </BaseIcon>
    <p>{{ product.text }}</p>
    <div class="container">
      <BaseIcon name="dollar-sign">
        <h5>Current offers</h5>
      </BaseIcon>
      <BaseAddButton
        text="Make Offer"
        :navigation="{
          name: 'offer-create',
          params: { auctionUrl: product.auctions[0], productUrl: product.url }
        }"
      />
    </div>
    <OfferCard v-for="offer in offers" :key="offer.url" :offer="offer" />
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import OfferCard from '@/components/offer/OfferCard.vue'

export default {
  components: {
    OfferCard
  },
  data() {
    return {
      offers: [],
      product: null,
      seller: null
    }
  },
  created() {
    AxiosService.getType('product', this.$route.params.id)
    .then(res => {
      this.product = res.data
      this.product.offers.forEach(url => {
      AxiosService.get(url)
        .then(response => {
          this.offers.push(response.data)
        })
        .catch(error => {
          console.log('There is an error:' + error.response)
        })
    })
     AxiosService.get(this.product.seller)
      .then(response => {
          this.seller = response.data
        })
        .catch(error => {
          console.log('There is an error:' + error.response)
        })
    })
    .catch(error => {
      console.log('There is an error:' + error.response)
    })
  },
  methods: {
    deleteProduct: function() {
      AxiosService.delete(this.product.url)
        .then(this.$router.push({ name: 'home' }))
        .catch(error => {
          console.log('There was an error: ' + error)
        })
    },
    updateProduct: function() {
      this.$router.push({
        name: 'product-update',
        params: { product: this.product }
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
