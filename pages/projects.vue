<template>
  <div :class="classes">
    <EffectText :effect="['gradient']" align="center">Projects</EffectText>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ProjectsPage')
definePageMeta({
  layout: 'default',
  key: (route) => route.fullPath,
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
  menu: {
    position: 3,
  },
})
</script>

<style lang="scss">
.ProjectsPage {
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>