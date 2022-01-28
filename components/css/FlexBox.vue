<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    class: true,
    validator(value) {
      return ['row', 'column'].includes(value)
    },
  },
  align: {
    type: String,
    default: 'start',
    class: {
      useName: true,
    },
    validator(value) {
      return ['start', 'center', 'start'].includes(value)
    },
  },
})
const classes = defineClasses('FlexBox')
</script>

<style lang="scss">
.FlexBox {
  display: flex;
  &_row {
    flex-direction: row;
  }
  &_column {
    flex-direction: column;
  }
  &_align_start {
    align-items: flex-start;
  }
  &_align_center {
    align-items: center;
  }
  &_align_end {
    align-items: flex-end;
  }
}
</style>