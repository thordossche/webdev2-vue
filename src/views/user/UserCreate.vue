<template>
  <div class="container">
    <h2>Create User</h2>
    <UserForm @on-submit="createUser" />
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'
import UserForm from '@/components/user/UserForm.vue'

export default {
  components: {
    UserForm
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    createUser: function(userData) {
      this.errors = []
      AxiosService.create('user', userData)
        .then(response => {
          this.$router.push({
            name: 'user-show',
            params: { id: response.data.url.split("/").pop() }
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
