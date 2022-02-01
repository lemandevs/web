<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'clear',
    validator(value) {
      return ['clear', 'fill'].includes(value)
    },
    class: true,
  },
})
const classes = defineClasses('Panel')
</script>

<style lang="scss">
.Panel {
  width: 100%;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  background: var(--color-surface);

  background: linear-gradient(
      -65deg,
      rgba(var(--color-emphatic-rgb), 0.15),
      rgba(var(--color-emphatic-rgb), 0.05)
    ),
    linear-gradient(-65deg, var(--color-surface), var(--color-surface));
  background-clip: padding-box;
}
</style>