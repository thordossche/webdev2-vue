<template>
  <form class="offer-form" @submit.prevent="onSubmit">
    <p>
      <label for="buyer">Buyer:</label>
      <select v-model="offer.buyer">
        <option v-for="user in buyers" v-bind:key="user.url" v-bind:value="user.url">{{ user.name }}</option>
      </select>
    </p>

    <p>
      <label for="price">Price:</label>
      <input id="price" v-model="offer.price" class="input" />
    </p>

    <p>
      <input type="submit" value="Submit" />
    </p>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </form>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'

export default {
  data() {
    return {
      offer: {
        buyer: '',
        price: 0
      },
      buyers: [],
      errors: []
    }
  },
  methods: {
    onSubmit() {
      let offerData = {
        buyer: this.offer.buyer,
        price: this.offer.price
      }
      this.errors = []
      if (this.offer.buyer && this.offer.price) {
        this.$emit('on-submit', offerData)
        this.offer.buyer = null
        this.offer.offer = null
      } else {
        if (!this.offer.buyer) this.errors.push('Buyer required.')
        if (!this.offer.price) this.errors.push('Price required.')
      }
    }
  },
  created() {
    AxiosService.getUsers()
      .then(response => {
        response.data.users.forEach(userUrl => {
          AxiosService.get(userUrl)
            .then(response => {
              this.buyers.push(response.data)
            })
            .catch(error => {
              console.log('There is an error:' + error.response)
            })
        })
      })
      .catch(error => {
        console.log('There is an error:' + error.response)
      })
  }
}
</script>

<style>
input,
select {
  padding: 10px;
  border-radius: 10px;
}
label {
  margin-right: 10px;
}

.offer-form {
  width: auto;
  padding: 20px;
  margin-top: 0px;
  border: 1px solid #d8d8d8;
}
</style>
