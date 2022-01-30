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
    default: 'middle',
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
  zindex: {
    type: Number,
    default: null,
  },
})
const style = computed(() => ({
  '--absolute-offset-x': Number.isInteger(props.offsetX)
    ? `${props.offsetX}px`
    : props.offsetX,
  '--absolute-offset-y': Number.isInteger(props.offsetY)
    ? `${props.offsetY}px`
    : props.offsetY,
  '--absolute-z-index': Number.isInteger(props.zindex)
    ? props.zindex
    : 'initial',
}))
const classes = defineClasses('Absolute')
</script>

<style lang="scss">
.Absolute {
  position: absolute;
  --absolute-offset-x: 0;
  --absolute-offset-y: 0;
  --absolute-z-index: initial;
  &_top {
    top: 0;
    z-index: var(--absolute-z-index);
    &.Absolute_start {
      left: 0;
      transform: translate3d(
        var(--absolute-offset-x),
        var(--absolute-offset-y),
        0
      );
    }
    &.Absolute_middle {
      left: 50%;
      transform: translate3d(
        calc(-50% + var(--absolute-offset-x)),
        var(--absolute-offset-y),
        0
      );
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        calc(var(--absolute-offset-y)),
        0
      );
    }
  }
  &_center {
    top: 50%;
    &.Absolute_start {
      left: 0;
      transform: translate3d(
        var(--absolute-offset-x),
        var(--absolute-offset-y),
        0
      );
    }
    &.Absolute_middle {
      left: 50%;
      transform: translate3d(
        calc(-50% + var(--absolute-offset-x))
          calc(-50% + var(--absolute-offset-y)),
        0
      );
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(
        var(--absolute-offset-x),
        calc(-100% + var(--absolute-offset-y)),
        0
      );
    }
  }
  &_bottom {
    top: 100%;
    &.Absolute_start {
      left: 0;
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        var(--absolute-offset-y),
        0
      );
    }
    &.Absolute_middle {
      left: 50%;
      transform: translate3d(
        var(--absolute-offset-x),
        calc(-50% + var(--absolute-offset-y)),
        0
      );
    }
    &.Absolute_end {
      left: 100%;
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        calc(-100% - var(--absolute-offset-y)),
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
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        var(--absolute-offset-y),
        0
      );
    }
    &.Absolute_middle {
      top: 50%;
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        calc(-50% + var(--absolute-offset-y)),
        0
      );
    }
    &.Absolute_end {
      top: 100%;
      transform: translate3d(
        calc(-100% - var(--absolute-offset-x)),
        calc(-100% + var(--absolute-offset-y)),
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