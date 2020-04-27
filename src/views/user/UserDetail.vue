<template>
  <div v-if="user">
    <div class="buttons">
      <BaseDeleteButton @delete-clicked="deleteUser" />
      <BaseUpdateButton @update-clicked="updateUser" />
    </div>
    <h2 class="title">{{ user.name }}'s profile</h2>
    <div>
      <BaseIcon name="user">{{ user.name }}</BaseIcon>
    </div>
    <div>
      <BaseIcon name="at-sign">{{ user.email }}</BaseIcon>
    </div>
    <br />
    <div>
      <BaseIcon name="list">
        <h5>Auctions</h5>
      </BaseIcon>
      <AuctionCard v-for="auction in auctions" :key="auction.url" :auction="auction" />
    </div>
    <div>
      <BaseIcon name="package">
        <h5>Products</h5>
      </BaseIcon>
      <ProductCard v-for="product in products" :key="product.url" :product="product" />
    </div>
    <div>
      <BaseIcon name="dollar-sign">
        <h5>Offers</h5>
      </BaseIcon>
      <OfferCard v-for="offer in offers" :key="offer.url" :offer="offer" />
    </div>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import AuctionCard from '@/components/auction/AuctionCard.vue'
import ProductCard from '@/components/product/ProductCard.vue'
import OfferCard from '@/components/offer/OfferCard.vue'
export default {
  components: {
    AuctionCard,
    ProductCard,
    OfferCard
  },
  data() {
    return {
      user: null,
      auctions: [],
      products: [],
      offers: []
    }
  },
  methods: {
    deleteUser: function() {
      AxiosService.delete(this.user.url)
        .then(this.$router.push({ name: 'user-list' }))
        .catch(error => {
          console.log('There was an error: ' + error)
        })
    },
    updateUser: function() {
      this.$router.push({ name: 'user-update', params: { id: this.user.url.split("/").pop() } })
    }
  },
  created() {
    AxiosService.getType('user', this.$route.params.id)
    .then(res => {
      this.user = res.data
      this.user.auctions.forEach(aucUrl => {
      AxiosService.get(aucUrl)
        .then(response => {
          this.auctions.push(response.data)
        })
        .catch(error => {
          'There was an error: ' + error
        })
    })

    this.user.products.forEach(productUrl => {
      AxiosService.get(productUrl)
        .then(response => {
          this.products.push(response.data)
        })
        .catch(error => {
          'There was an error: ' + error
        })
    })

    this.user.offers.forEach(offerUrl => {
      AxiosService.get(offerUrl)
        .then(response => {
          this.offers.push(response.data)
        })
        .catch(error => {
          'There was an error: ' + error
        })
    })
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>
<style scoped>
.buttons {
  float: right;
  padding: 20px;
}
.flex {
  display: flex;
  margin-top: 20px;
}
.flexbutton {
  margin-right: 10px;
  margin-top: 20px;
}
</style>
