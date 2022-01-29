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
  navBar: {
    position: 0,
  },
})
</script>

<style lang="scss">
.DesignPage {
}
</style>