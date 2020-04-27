<template>
  <div>
    <div class="container">
      <h1>Users</h1>
      <BaseAddButton text="Add User" :navigation="{ name: 'user-create' }" />
    </div>
    <UserCard v-for="user in users" :key="user.url" :user="user" />
  </div>
</template>

<script>
import UserCard from '@/components/user/UserCard.vue'
import AxiosService from '@/services/AxiosService.js'

export default {
  components: {
    UserCard
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    AxiosService.getUsers()
      .then(response => {
        response.data.users.forEach(url => {
          AxiosService.get(url)
            .then(response => {
              this.users.push(response.data)
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
h1 {
  display: inline-block;
}
button {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 7px;
  background-color: white;
  text-align: center;
  cursor: pointer;
}
button:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
