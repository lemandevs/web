<template>
  <li :class="classes">
    <slot />
  </li>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    class: true,
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    },
  },
})
const classes = defineClasses('MenuItem')
</script>

<style lang="scss">
.MenuItem {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &_small {
    padding: 0.25rem 1rem;
  }
  &_medium {
    padding: 0.5rem 1rem;
  }
  &_large {
    padding: 1rem;
  }
}
</style>