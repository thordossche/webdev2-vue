<template>
  <div v-if="user">
    <h1>Update {{ user.name }}</h1>
    <UserForm :user="user" @on-submit="updateUser" />
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
      user: null,
      errors: []
    }
  },
  created() {
    AxiosService.getType('user', this.$route.params.id)
      .then(res => {
        this.user = res.data
      })
      .catch(error => {
        'There is an error:' + error.response
      })
  },
  methods: {
    updateUser(user) {
      this.errors = []
      AxiosService.update(this.user.url, user)
        .then(response => {
          setTimeout(
            function() {
              this.$router.push({
                name: 'user-show',
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
