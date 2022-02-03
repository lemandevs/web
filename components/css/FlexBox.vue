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
      return ['start', 'center', 'end'].includes(value)
    },
  },
  justify: {
    type: String,
    default: 'start',
    class: {
      useName: true,
    },
    validator(value) {
      return [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ].includes(value)
    },
  },
  gap: {
    type: [String, Number],
    default: 0,
    class: {
      useName: true,
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

  &_justify_start {
    justify-content: flex-start;
  }
  &_justify_center {
    justify-content: center;
  }
  &_justify_end {
    justify-content: flex-end;
  }
  &_justify_space-around {
    justify-content: space-around;
  }
  &_justify_space-between {
    justify-content: space-between;
  }
  &_gap_1 {
    gap: 1rem;
  }
}
</style>