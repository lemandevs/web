<template>
  <div :class="classes">Typography page</div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    class: true,
  },
})
const classes = defineClasses('TypographyPage')
definePageMeta({
  icon: 'Typography',
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
  navBar: {
    position: 2,
  },
  menu: {
    position: 2,
  },
})
</script>

<style lang="scss">
.TypographyPage {
}
</style>