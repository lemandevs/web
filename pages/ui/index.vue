<template>
  <div :class="classes">UI Home Page</div>
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

definePageMeta({
  icon: 'Home',
  pageTransition: 'TransitionAppear',
})
</script>

<style lang="scss">
.UIHomePage {
}
</style>