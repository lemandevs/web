<template>
  <div :class="classes">Design Page</div>
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
const classes = defineClasses('DesignPage')
definePageMeta({
  icon: 'Design',
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
  navBar: {
    position: 0,
  },
  menu: {
    position: 1,
  },
})
</script>

<style lang="scss">
.DesignPage {
}
</style>