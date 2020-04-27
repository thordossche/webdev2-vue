<template>
  <div class="container">
    <h2>Create Auction</h2>
    <AuctionForm @on-submit="createAuction" />
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
      errors: []
    }
  },
  methods: {
    createAuction(auction) {
      this.errors = []
      AxiosService.create('auction', auction)
        .then(response => {
          this.$router.push({
            name: 'auction-show',
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
input {
  padding: 10px;
  border-radius: 10px;
}
label {
  margin-right: 10px;
}

.user-form {
  width: auto;
  padding: 20px;
  margin-top: 0px;
  border: 1px solid #d8d8d8;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
