<template>
  <div>
    <NavigationCard
      v-for="card in cards"
      :key="card.name"
      :navigationInfo="card"
    />
  </div>
</template>

<script>
import NavigationCard from '@/components/NavigationCard.vue'

export default {
  components: {
    NavigationCard
  },
  data() {
    return {
      cards: [
        { name: 'Auctions', icon: 'list', link: 'auction-list' },
        { name: 'Users', icon: 'users', link: 'user-list' }
      ]
    }
  }
}
</script>
