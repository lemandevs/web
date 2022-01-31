<template>
  <span :class="classes">
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({
  prop: {
    type: String,
    default: 'value',
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('TextOverflow')
</script>

<style lang="scss">
.TextOverflow {
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>