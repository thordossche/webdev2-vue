<template>
  <div class="container">
    <h2>Create Product</h2>
    <ProductForm @on-submit="createProduct" />
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import ProductForm from '@/components/product/ProductForm.vue'

export default {
  components: {
    ProductForm
  },
  props: {
    auctionUrl: {
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
    createProduct: function(productData) {
      this.errors = []
      let auction
      AxiosService.get(this.auctionUrl)
        .then(response => {
          auction = response.data
          return AxiosService.create('product', productData)
        })
        .then(response => {
          auction.products.push(response.data.url)
          return AxiosService.update(auction.url, {
            products: auction.products
          })
        })
        .then(() => {
          setTimeout(
            function() {
              this.$router.push({
                name: 'auction-show',
                params: { id: this.auctionUrl.split('/').pop() }
              })
            }.bind(this),
            500
          )
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
