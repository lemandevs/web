<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  prop: {
    type: String,
    default: 'value',
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('Overlay')
</script>

<style lang="scss">
.Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 500ms ease;
  background: rgba(var(--color-surface-rgb), 0.1);
  backdrop-filter: blur(4px);
}
</style>