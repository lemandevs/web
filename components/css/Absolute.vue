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
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['top', 'bottom', 'right', 'left', 'center'].includes(value)
    },
    class: true,
  },
  align: {
    type: String,
    default: 'center',
    validator(value) {
      return ['start', 'middle', 'end'].includes(value)
    },
    class: true,
  },
  offsetX: {
    type: Number,
    default: 0,
  },
  offsetY: {
    type: Number,
    default: 0,
  },
})
const style = {
  '--offset-x': Number.isInteger(props.offsetX)
    ? `${props.offsetX}px`
    : props.offsetX,
  '--offset-y': Number.isInteger(props.offsetY)
    ? `${props.offsetY}px`
    : props.offsetY,
}
const classes = defineClasses('Absolute')
</script>

<style lang="scss">
.Absolute {
  position: absolute;
  --offset-x: 0;
  --offset-y: 0;
  &_top {
    top: 0;
    &.Absolute_start {
      left: 0;
      transform: translate3d(var(--offset-x), var(--offset-y), 0);
    }
    &.Absolute_center {
      left: 50%;
      transform: translate3d(var(--offset-x), calc(-50% + var(--offset-y)), 0);
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(var(--offset-x), calc(-100% - var(--offset-y)), 0);
    }
  }
  &_center {
    top: 50%;
    &.Absolute_start {
      left: 0;
      transform: translate3d(var(--offset-x), var(--offset-y), 0);
    }
    &.Absolute_center {
      left: 50%;
      transform: translate3d(
        calc(-50% + var(--offset-x)) calc(-50% + var(--offset-y)),
        0
      );
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(var(--offset-x), calc(-100% + var(--offset-y)), 0);
    }
  }
  &_bottom {
    top: 100%;
    &.Absolute_start {
      left: 0;
      transform: translate3d(calc(-100% - var(--offset-x)), var(--offset-y), 0);
    }
    &.Absolute_middle {
      left: 50%;
      transform: translate3d(var(--offset-x), calc(-50% + var(--offset-y)), 0);
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(
        calc(-100% - var(--offset-x)),
        calc(-100% - var(--offset-y)),
        0
      );
    }
  }
  &_top_left {
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translate3d(-100%, 0, 0);
  }

  &_right {
    position: absolute;
    top: 50%;
    left: 100%;
    &.Absolute_start {
      top: 0%;
      transform: translate3d(calc(-100% - var(--offset-x)), var(--offset-y), 0);
    }
    &.Absolute_middle {
      top: 50%;
      transform: translate3d(
        calc(-100% - var(--offset-x)),
        calc(-50% + var(--offset-y)),
        0
      );
    }
    &.Absolute_end {
      top: 100%;
      transform: translate3d(
        calc(-100% - var(--offset-x)),
        calc(-100% + var(--offset-y)),
        0
      );
    }
  }

  &_left {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
  }
}
</style>