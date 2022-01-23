<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'column',
    class: true,
    validator(value) {
      return ['column', 'row'].includes(value)
    },
  },
  loading: {
    type: Boolean,
    class: true,
    default: false,
  },
})
const classes = defineClasses('Menu')
</script>

<style lang="scss">
.Menu {
  width: 100%;
  display: flex;
  &_column {
    flex-direction: column;
  }
  &_row {
    flex-direction: row;
  }
}
</style>