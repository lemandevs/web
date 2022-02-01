<template>
  <div :class="classes">ProjectsPage</div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ProjectsPage')
definePageMeta({
  layout: 'default',
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