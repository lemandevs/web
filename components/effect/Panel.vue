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
  border-radius: 1rem;

  background: var(--color-surface);

  background: linear-gradient(
    45deg,
    rgba(var(--color-surface-rgb), 0.7),
    var(--color-surface)
  );
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  background-clip: padding-box;
  border: solid 2px transparent;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: 0px;
    border-radius: inherit;
    background: linear-gradient(
      -45deg,
      rgba(var(--color-emphatic-rgb), 0.5),
      var(--color-emphatic)
    );
  }
}
</style>