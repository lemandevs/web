<template>
  <label :class="classes">
    <input type="checkbox" v-bind="$attrs" v-model="checked" />
    <Icon size="medium" name="Check" :active="checked" />
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
      class: true,
      default: false,
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
    const classes = defineClasses('Checkbox')
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
  methods: {
    onInput(event) {
      this.checked = event.target.checked
    },
  },
}
</script>

<style lang="scss">
.Checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  &_small {
    width: 1rem;
    height: 1rem;
  }
  &_medium {
    width: 1.5rem;
    height: 1.5rem;
  }
  &_large {
    width: 2rem;
    height: 2rem;
  }
}
.Checkbox input {
  opacity: 0;
  position: absolute;
}
.Checkbox:not(.Checkbox_value) {
  background-color: currentColor;
}

.Checkbox_value {
  background-color: var(--bg-emphatic);
}
</style>