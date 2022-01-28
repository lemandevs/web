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
    default: 'medium',
    validator(value) {
      return ['small', 'medium', 'large'].includes(value)
    },
  },
  active: {
    type: Boolean,
    class: true,
    default: false,
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
    padding: 0.5rem 1rem;
  }
  &_medium {
    padding: 1rem;
  }
  &_large {
    padding: 1.5rem 1rem;
  }
  &_active {
    background: rgba(var(--color-emphatic-rgb), 0.3);
  }
}
</style>