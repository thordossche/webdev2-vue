<template>
  <div class="event-card -shadow">
    <router-link class="event-link" :to="{ name: 'product-show', params: { id: productID } }">
      <BaseIcon name="user">{{ product.title }}</BaseIcon>
    </router-link>
    <BaseDeleteButton @delete-clicked="deleteProduct" />
    <BaseUpdateButton @update-clicked="updateProduct" />
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'

export default {
  props: {
    product: Object
  },
  methods: {
    deleteProduct: function() {
      AxiosService.delete(this.product.url)
        .then(this.$el.parentNode.removeChild(this.$el))
        .catch(error => {
          console.log('There was an error: ' + error)
        })
    },
    updateProduct: function() {
      this.$router.push({
        name: 'product-update',
        params: { id: this.productID }
      })
    }
  },
   computed: {
    productID() {
      return this.product.url.split("/").pop()
    }
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
  cursor: pointer;
}
</style>
