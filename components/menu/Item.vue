<template>
  <component :is="is" :class="classes" ref="itemEl">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    class: true,
    default: 'default',
    validator(value) {
      return ['default', 'small', 'medium', 'large'].includes(value)
    },
  },
  active: {
    type: Boolean,
    class: true,
    default: false,
  },
  is: {
    type: String,
    default: 'li',
  },
})
const classes = defineClasses('MenuItem')
const itemEl = ref()
watchEffect(() => {
  if (props.active) {
    nextTick(() => {
      itemEl.value.scrollIntoViewIfNeeded()
    })
  }
})
watch(props.active, (active) => {
  console.log(itemEl.value)
})
defineExpose({
  ref: itemEl,
})
</script>

<style lang="scss">
.MenuItem {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

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
    background: rgba(var(--color-emphatic-rgb), 0.1);
  }
  &:hover {
    background: rgba(var(--color-emphatic-rgb), 0.3);
  }
}
</style>