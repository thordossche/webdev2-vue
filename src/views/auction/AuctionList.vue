<template>
  <div>
    <div class="container">
      <h1>Auctions</h1>
      <BaseAddButton text="Add Auction" :navigation="{ name: 'auction-create' }" />
    </div>
    <AuctionCard v-for="auction in auctions" :key="auction.url" :auction="auction" />
  </div>
</template>

<script>
import AuctionCard from '@/components/auction/AuctionCard.vue'
import AxiosService from '@/services/AxiosService.js'

export default {
  components: {
    AuctionCard
  },
  data() {
    return {
      auctions: [],
      auction_urls: []
    }
  },
  created() {
    AxiosService.getAuctions()
      .then(response => {
        response.data.auctions.forEach(url => {
          AxiosService.get(url)
            .then(res => {
              this.auctions.push(res.data)
            })
            .catch(error => {
              console.log(error)
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
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
