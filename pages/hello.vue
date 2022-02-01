<template>
  <div :class="classes">
    <ComingSoon />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  key: (route) => route.fullPath,
  menu: {
    position: 1,
  },
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
})
const classes = defineClasses('HelloPage')
</script>

<style>
</style>