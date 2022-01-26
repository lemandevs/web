<template>
  <div :class="classes">UIHomePage</div>
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
const classes = defineClasses('UIHomePage')
</script>

<style lang="scss">
.UIHomePage {
}
</style>