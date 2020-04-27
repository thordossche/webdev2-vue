<template>
  <div v-if="auction">
    <h1>Update {{ auction.name }}</h1>
    <AuctionForm :auction="auction" @on-submit="updateAuction" />
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import AuctionForm from '@/components/auction/AuctionForm.vue'

export default {
  components: {
    AuctionForm
  },
  data() {
    return {
      auction: null,
      errors: []
    }
  },
  created() {
    AxiosService.getType('auction', this.$route.params.id)
      .then(res => {
        this.auction = res.data
      })
      .catch(error => {
        console.log('There is an error:' + error.response)
      })
  },
  methods: {
    updateAuction(auctionData) {
      this.errors = []
      AxiosService.update(this.auction.url, auctionData)
        .then(response => {
          setTimeout(
            function() {
              this.$router.push({
                name: 'auction-show',
                params: { id: response.data.url.split('/').pop() }
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
