<template>
  <form class="product-form" @submit.prevent="onSubmit">
    <p>
      <label for="title">Title:</label>
      <input id="title" v-model="product.title" placeholder="title" class="input" />
    </p>

    <p>
      <label for="text">Discription:</label>
      <textarea id="text" v-model="product.text" class="input" />
    </p>

    <p>
      <label for="seller">Seller:</label>
      <select v-model="product.seller">
        <option
          v-for="user in sellers"
          v-bind:key="user.url"
          v-bind:value="user.url"
        >{{ user.name }}</option>
      </select>
    </p>

    <p>
      <label for="price">Price:</label>
      <input id="price" v-model="product.price" placeholder="price" class="input" />
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
  props: {
    product: {
      type: Object,
      default() {
        return {
          title: null,
          text: null,
          seller: null,
          price: null
        }
      }
    }
  },
  data() {
    return {
      sellers: [],
      errors: []
    }
  },
  methods: {
    onSubmit() {
      let productData = {
        title: this.product.title,
        text: this.product.text,
        seller: this.product.seller,
        price: this.product.price
      }
      this.errors = []
      if (
        this.product.title &&
        this.product.text &&
        this.product.seller &&
        this.product.price
      ) {
        this.$emit('on-submit', productData)
        this.product.title = null
        this.product.text = null
        this.product.seller = null
        this.product.price = null
      } else {
        if (!this.product.title) this.errors.push('Title required.')
        if (!this.product.text) this.errors.push('Discription required.')
        if (!this.product.seller) this.errors.push('Seller required.')
        if (!this.product.price) this.errors.push('Price required.')
      }
    }
  },
  created() {
    AxiosService.getUsers()
      .then(response => {
        response.data.users.forEach(userUrl => {
          AxiosService.get(userUrl)
            .then(response => {
              this.sellers.push(response.data)
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
textarea,
select {
  padding: 10px;
  border-radius: 10px;
}
label {
  margin-right: 10px;
}

.product-form {
  width: auto;
  padding: 20px;
  margin-top: 0px;
  border: 1px solid #d8d8d8;
}
</style>
