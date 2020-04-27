<template>
  <div class="event-card -shadow">
    <router-link class="event-link" :to="{ name: 'user-show', params: { id: userID } }">
      <BaseIcon name="user">{{ user.name }}</BaseIcon>
    </router-link>
    <BaseDeleteButton @delete-clicked="deleteUser" />
    <BaseUpdateButton @update-clicked="updateUser" />
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'

export default {
  props: {
    user: Object
  },
  methods: {
    deleteUser: function() {
      AxiosService.delete(this.user.url)
        .then(this.$el.parentNode.removeChild(this.$el))
        .catch(error => {
          console.log('There was an error: ' + error)
        })
    },
    updateUser: function() {
      this.$router.push({ name: 'user-update', params: { id: this.userID } })
    }
  },
   computed: {
    userID() {
      return this.user.url.split("/").pop()
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
