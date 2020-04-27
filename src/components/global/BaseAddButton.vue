<template>
  <router-link class="link" :to="navigation">
    <button class="addButton">
      <BaseIcon name="plus">{{ text }}</BaseIcon>
    </button>
  </router-link>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    navigation: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.addButton {
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 7px;
  background-color: white;
  text-align: center;
  cursor: pointer;
}
.addButton:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
}
.link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
