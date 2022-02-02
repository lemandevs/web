<template>
  <div :class="classes">
    <EffectText :effect="['gradient']" align="center">Components</EffectText>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComponentsPage')
definePageMeta({
  icon: 'Component',
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
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