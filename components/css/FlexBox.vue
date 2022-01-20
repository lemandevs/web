<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    class: true,
    validator(value) {
      return ['row', 'column'].includes(value)
    },
    class: true,
  },
})
const classes = defineClasses('FlexBox')
</script>

<style lang="scss">
.FlexBox {
  display: flex;
  &_row {
    flex-direction: row;
  }
  &_column {
    flex-direction: column;
  }
}
</style>