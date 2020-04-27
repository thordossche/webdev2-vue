<template>
  <div class="container">
    <h2>Create Offer</h2>
    <OfferForm @on-submit="createOffer" />
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import OfferForm from '@/components/offer/OfferForm.vue'

export default {
  components: {
    OfferForm
  },
  props: {
    auctionUrl: {
      type: String,
      required: true
    },
    productUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    createOffer: function(offerData) {
      this.errors = []
      offerData.product = this.productUrl
      offerData.auction = this.auctionUrl
      AxiosService.create('offer', offerData)
        .then(() => {
          return AxiosService.get(this.productUrl)
        })
        .then(response => {
          this.$router.push({
            name: 'product-show',
            params: { id: response.data.url.split('/').pop() }
          })
        })
        .catch(error => {
          Object.keys(error.response.data).forEach(e =>
            this.errors.push(error.response.data[e])
          )
        })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
