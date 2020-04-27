<template>
  <div>
    <div class="event-card -shadow">
      <router-link class="event-link" :to="{ name: 'auction-show', params: { id: auctionID} }">
        <h4 class="title">{{ auction.name }}</h4>
        <span class="eyebrow">{{ date(auction.start) }} - {{ date(auction.end) }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    auction: {
      type: Object,
      required: true
    }
  },
  methods: {
    date: function(date) {
      return moment(date).format('MMMM Do YYYY')
    }
  },
  computed: {
    auctionID() {
      return this.auction.url.split("/").pop()
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0px;
}
.event-card {
  padding: 10px;
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
.container {
  display: inline-flex;
}
</style>
