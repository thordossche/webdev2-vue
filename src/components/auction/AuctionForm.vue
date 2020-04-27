<template>
  <div class="container">
    <form class="auction-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Auction name:</label>
        <input id="name" v-model="auction.name" placeholder="name" class="input" />
      </p>

      <p>
        <label for="location">Location:</label>
        <input id="location" v-model="auction.location" placeholder="e.g. Gent" class="input" />
      </p>
      <p>
      <label>Organisers:</label>
      </p>
       <div class="scrollable">
          <ul>
            <li v-for="user in users" :key="user.url">
              <input type="checkbox" :id="user.url" :value="user.url" v-model="auction.organisers">
              <label :for="user.name">{{user.name}}</label>
            </li>
          </ul>
        </div>

      <p>
        <label for="start">Starting date:</label>
        <input id="start" v-model="auction.start" type="datetime" placeholder="YYYY/MM/DD"/>
      </p>
      <p>
        <label for="end">Ending date:</label>
        <input id="end" v-model="auction.end" type="datetime" placeholder="YYYY/MM/DD"/>
      </p>
      <p>
        <label for="deadlineProducts">Deadline for products:</label>
        <input id="deadlineProducts" v-model="auction.deadlineProducts" type="datetime" placeholder="YYYY/MM/DD"/>
      </p>
      <p>
        <label for="deadlineOffers">Deadline for offers:</label>
        <input id="deadlineOffers" v-model="auction.deadlineOffers" type="datetime" placeholder="YYYY/MM/DD"/>
      </p>
      <p>
        <input type="submit" value="Submit" />
      </p>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
    </form>
  </div>
</template>

<script>
import AxiosService from '@/services/AxiosService.js'

export default {
  props: {
    auction: {
      type: Object,
      default() {
        return {
          name: null,
          location: null,
          organisers: [],
          start: null,
          end: null,
          deadlineProducts: null,
          deadlineOffers: null
        }
      }
    }
  },
  data() {
    return {
      users: [],
      errors: []
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
  },
  methods: {
    onSubmit() {
      this.errors = []
       let auctionData = {
        name: this.auction.name,
        location: this.auction.location,
        organisers: this.auction.organisers,
        start: this.auction.start,
        end: this.auction.end,
        deadlineOffers: this.auction.deadlineOffers,
        deadlineProducts: this.auction.deadlineProducts,
      }
        if (Object.values(this.auction).some(x => (x === null || x === ''))){
          this.errors.push('Please fill in all fields.')
        }
        else if (!this.auction.organisers.length) {
          this.errors.push('At least one organiser is required.')
        }
        else {
          this.$emit('on-submit', auctionData)
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

.auction-form {
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

.scrollable {
  overflow-y:scroll;
  overflow-x:visible;
  height:40%;
  width:100%;
}

ul {
  list-style-type: none;
  margin: 0px;
}
</style>
