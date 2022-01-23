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
    alias: {
      type: String,
      default: 'Switch',
    },
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  setup(props) {
    const { thematize } = useThematize(props, [
      { alias: String },
      { alias: String, size: String },
    ])
    return { thematize }
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
    classes() {
      return this.thematize([
        {
          [`${this.alias}_checked`]: this.checked,
        },
      ])
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
    background-color: blue;
  }
  25% {
    left: 0;
    width: calc(var(--latch-size) * 2);
    transform: translate3d(4px, -50%, 0);
  }
  50% {
    width: var(--latch-size);
  }
  100% {
    left: 100%;
    width: var(--latch-size);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
    background-color: red;
  }
}

@keyframes off {
  100% {
    left: 0;
    transform: translate3d(4px, -50%, 0);
    width: var(--latch-size);
    background-color: blue;
  }
  50% {
    left: 25%;
    width: var(--latch-size);
    transform: translate3d(-50%, -50%, 0);
  }
  25% {
    left: 100%;
    width: calc(var(--latch-size) * 2);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
  }
  0% {
    left: 100%;
    width: var(--latch-size);
    transform: translate3d(calc(-100% - 4px), -50%, 0);
    background-color: red;
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
  background-color: currentColor;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 20s;
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
  transition-duration: 20s;
}

.Switch:not(.Switch_checked) .Latch::after {
  animation-name: off;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-fill-mode: both;
}
.Switch_checked input:checked ~ .Latch::after {
  animation-name: on;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-fill-mode: both;
}
</style>