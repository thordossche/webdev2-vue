<template>
  <div v-if="product">
    <h1>Update {{ product.title }}</h1>
    <ProductForm :product="product" @on-submit="updateProduct" />
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
  data() {
    return {
      product: null,
      errors: []
    }
  },
  created() {
    AxiosService.getType('product', this.$route.params.id)
      .then(res => {
        this.product = res.data
      })
      .catch(error => {
        console.log('There is an error:' + error.response)
      })
  },
  methods: {
    updateProduct(product) {
      this.errors = []
      AxiosService.update(this.product.url, product)
        .then(
          setTimeout(
            function() {
              this.$router.push({
                name: 'product-show',
                params: { id: this.product.url.split('/').pop() }
              })
            }.bind(this),
            500
          )
        )
        .catch(error => {
          Object.keys(error.response.data).forEach(e =>
            this.errors.push(error.response.data[e])
          )
        })
    }
  }
}
</script>
