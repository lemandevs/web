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
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
  menu: {
    position: 0,
  },
})
</script>

<style lang="scss">
.UIHomePage {
}
</style>