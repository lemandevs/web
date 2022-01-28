<template>
  <div :class="classes">Component Page</div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComponentsPage')
definePageMeta({
  icon: 'Component',
})
</script>

<style lang="scss">
.DesignPage {
}
</style>