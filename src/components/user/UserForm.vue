<template>
  <form class="user-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Username:</label>
      <input id="name" v-model="user.name" placeholder="username" class="input" />
    </p>

    <p>
      <label for="email">Email:</label>
      <input id="email" v-model="user.email" placeholder="freya.vs@gmail.com" class="input" />
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
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          name: null,
          email: null
        }
      }
    }
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    onSubmit() {
      let userData = {
        name: this.user.name,
        email: this.user.email
      }
      this.errors = []
      if (this.user.name && this.user.email) {
        this.$emit('on-submit', userData)
      } else {
        if (!this.user.name) this.errors.push('Name required.')
        if (!this.user.email) this.errors.push('Email required.')
      }
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
</style>
