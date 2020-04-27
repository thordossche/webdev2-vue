<template>
  <div class="icon-wrapper">
    <svg class="icon" :width="width" :height="height" v-on:click="deleteClicked">
      <use v-bind="{ 'xlink:href': '/symbols.svg#' + icon_name }" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  },
  data() {
    return {
      icon_name: 'trash-2'
    }
  },
  methods: {
    deleteClicked: function() {
      this.$emit('delete-clicked')
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 1);
  font-size: 1rem;
  font-weight: 600;
  float: right;
  cursor: pointer;
  margin-right: 15px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 15px;
  cursor: pointer;
}
</style>
