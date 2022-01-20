<template>
  <i :class="classes">
    <component :is="icon" :active="active" />
  </i>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    class: true,
    required: true,
  },
  size: {
    type: String,
    class: true,
    default: 'medium',
    validator(value) {
      return ['tiny', 'small', 'medium', 'large', 'big', 'huge'].includes(value)
    },
  },
  active: {
    class: true,
    type: Boolean,
  },
  loading: {
    class: true,
    type: Boolean,
  },
})

const { name } = toRefs(props)

const icon = computed(() => `Icon${name.value}`)

const classes = defineClasses('Icon')
</script>

<style lang="scss">
.Icon {
  display: inline-flex;
  &_tiny {
    width: 0.75rem;
    height: 0.75rem;
  }
  &_small {
    width: 1rem;
    height: 1rem;
  }
  &_medium {
    width: 1.25rem;
    height: 1.25rem;
  }
  &_large {
    width: 1.5rem;
    height: 1.5rem;
  }
  &_big {
    width: 1.75rem;
    height: 1.75rem;
  }
  &_huge {
    width: 2rem;
    height: 2rem;
  }
  .Shape,
  .Shape::before,
  .Shape::after {
    color: inherit;
    background-color: currentColor;
  }
}
</style>