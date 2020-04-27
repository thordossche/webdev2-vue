<template>
  <div class="event-card -shadow">
    <BaseDeleteButton @delete-clicked="deleteOffer" />
    <router-link class="event-link" :to="{ name: 'product-show', params: { id: productID } }">
      <div>
        <BaseIcon name="user">{{ buyername }}</BaseIcon>
        <div>
          <BaseIcon name="dollar-sign">{{ offer.price }}</BaseIcon>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'

export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      buyername: ''
    }
  },
  methods: {
    deleteOffer: function() {
      AxiosService.delete(this.offer.url)
        .then(this.$el.parentNode.removeChild(this.$el))
        .catch(error => {
          console.log('There was an error: ' + error)
        })
    }
  },
  created() {
    AxiosService.get(this.offer.buyer)
      .then(response => {
        this.buyername = response.data.name
      })
      .catch(error => {
        console.log('There is an error:' + error.response)
      })
  },
  computed: {
    productID() {
      return this.offer.product.split('/').pop()
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
