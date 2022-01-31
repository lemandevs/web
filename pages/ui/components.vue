<template>
  <div :class="classes">Component Page</div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComponentsPage')
definePageMeta({
  icon: 'Component',
  pageTransition: 'TransitionAppear',
  navBar: {
    position: 3,
  },
  menu: {
    position: 3,
  },
})
</script>

<style lang="scss">
.ComponentsPage {
}
</style>