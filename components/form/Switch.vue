<template>
  <label :class="classes">
    <input type="checkbox" v-bind="$attrs" v-model="checked" />
    <span class="Latch" />
  </label>
</template>

<script>
/**
 * Switches toggle the state of a single setting on or off. Switches are the preferred way to adjust settings on mobile.
 */
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
      class: true,
    },
    size: {
      type: String,
      default: 'medium',
      class: true,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  setup(props) {
    const classes = defineClasses('Switch')
    return { classes }
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set() {
        this.$emit('update:value', !this.value)
      },
    },
  },
}
</script>

<style lang="scss">
@keyframes on {
  0% {
    left: 0;
    transform: translate3d(4px, -50%, 0);
    width: var(--latch-size);
  }
  25% {
    left: 0;
    width: calc(var(--latch-size) * 1.5);
    transform: translate3d(4px, -50%, 0);
  }
  50% {
    width: var(--latch-size);
    left: 75%;
    transform: translate3d(-50%, -50%, 0);
  }
  100% {
    left: 100%;
    width: var(--latch-size);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
  }
}

@keyframes off {
  100% {
    left: 0;
    transform: translate3d(4px, -50%, 0);
    width: var(--latch-size);
  }
  50% {
    left: 25%;
    width: var(--latch-size);
    transform: translate3d(-50%, -50%, 0);
  }
  25% {
    left: 100%;
    width: calc(var(--latch-size) * 1.5);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
  }
  0% {
    left: 100%;
    width: var(--latch-size);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
  }
}
.Switch {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 20s ease-in-out;
  --latch-size: 0.5rem;
  width: var(--latch-size);
  height: var(--latch-size);
  &_small {
    width: 2rem;
    height: 1rem;
    input ~ span::after {
      content: '';
      --latch-size: 0.5rem;
      height: var(--latch-size);
    }
  }
  &_medium {
    width: 3rem;
    height: 1.5rem;
    input ~ span::after {
      content: '';
      --latch-size: 1rem;
      height: var(--latch-size);
    }
  }
  &_large {
    width: 4rem;
    height: 2rem;
    input ~ span::after {
      content: '';
      --latch-size: 1.5rem;
      height: var(--latch-size);
    }
  }
}

.Switch input {
  position: absolute;
  opacity: 0;
}

.Switch input ~ .Latch {
  position: relative;
  display: flex;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  border-color: transparent;
  overflow: hidden;
}

.Switch input ~ .Latch::after {
  content: '';
  position: absolute;
  top: 50%;
  border-radius: 999px;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}

.Switch:not(.Switch_value) .Latch {
  background-color: var(--color-background);
  &::after {
    background-color: currentColor;
    animation-name: off;
  }
}
.Switch_value .Latch {
  background-color: var(--color-emphatic);
  &::after {
    background-color: currentColor;
    animation-name: on;
  }
}
</style>