<template>
  <component :is="is" :class="classes" v-bind="$attrs" :style="style">
    <slot></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  is: {
    type: String,
    default: 'div',
  },
  top: {
    type: Number,
    default: 0,
  },
})
const style = {
  '--sticky-top': Number.isInteger(props.top) ? `${props.top}px` : 0,
}
const classes = defineClasses('Sticky')
</script>

<style lang="scss">
.Sticky {
  position: sticky;
  top: var(--sticky-top);
}
</style>