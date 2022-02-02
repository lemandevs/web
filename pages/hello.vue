<template>
  <div :class="classes">
    <EffectText :effect="['gradient']">Hello!</EffectText>
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
const stack = ref([
  'JavaScript',
  'CSS',
  'HTML',
  'Vue',
  'Nuxt',
  'JavaScript',
  'CSS',
  'HTML',
  'Vue',
  'Nuxt',
])
</script>

<style lang="scss">
.HelloPage {
  text-align: center;
}
</style>