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
    45deg,
    rgba(var(--color-surface-rgb), 0.7),
    var(--color-surface)
  );
  background-clip: padding-box;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(
      -45deg,
      rgba(var(--color-emphatic-rgb), 0.5),
      var(--color-emphatic)
    );
  }
}
</style>