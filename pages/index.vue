<template>
  <div :class="classes">
    <ComingSoon />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  menu: {
    position: 1,
  },
})
const classes = defineClasses('HomePage')
</script>

<style>
</style>