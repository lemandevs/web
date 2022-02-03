<template>
  <IconChevron :class="classes" :active="active" />
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    class: true,
  },
})
const classes = defineClasses('ChevronXIcon')
</script>

<style lang="scss" scoped>
.ChevronXIcon {
  transform: rotate(90deg);
}
</style>