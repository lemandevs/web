<template>
  <div :class="classes">
    <EffectText :effect="['gradient']" align="center">LEMAN.DEV</EffectText>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  key: (route) => route.fullPath,
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
})
const classes = defineClasses('HomePage')
</script>

<style>
</style>