<template>
  <input
    v-if="type === 'text'"
    :class="inputClasses"
    v-bind="$attrs"
    ref="input"
    :type="type"
    v-model="inputValue"
    @blur="onBlur"
    @focus="onFocus"
    :placeholder="placeholder"
  />
  <div v-else-if="type === 'password'" class="PasswordInput">
    <input
      :class="inputClasses"
      v-bind="$attrs"
      ref="input"
      :type="encript ? 'password' : 'text'"
      v-model="inputValue"
      @blur="onBlur"
      @focus="onFocus"
      :placeholder="placeholder"
    />
    <Btn
      icon="Eye"
      :size="size"
      level="secondary"
      variant="fill"
      @mousedown="encript = false"
      @mouseup="encript = true"
      @mouseleave="encript = true"
      @touchstart="encript = !encript"
      @touchend="encript = !encript"
      :active="encript"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    alias: {
      type: String,
      default: 'Input',
    },
    type: {
      type: String,
      default: 'text',
    },
    icon: {
      type: String,
    },
    placeholder: {
      type: String,
      default: 'Select a value',
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['tiny', 'small', 'medium', 'large', 'big', 'huge'].includes(
          value
        )
      },
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
      encript: true,
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      },
    },
    inputClasses() {
      return [
        ...this.classes,
        {
          [`Input_focused`]: this.focused,
          [`Input_empty`]: !this.value,
        },
      ]
    },
  },
  setup(props) {
    const classes = defineClasses('Input')
    return { classes }
  },
  methods: {
    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    focus() {
      this.$refs.input.focus()
    },
  },
  mounted() {
    if (this.autofocus) {
      this.focus()
    }
  },
}
</script>

<style lang="scss" scoped>
@keyframes blink {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

.Input {
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 2px var(--color-primary);
  border-radius: 8px;
  width: 100%;
  min-width: 0px;
  color: current;
  background: transparent;
  border: none;
  min-width: 0;
  caret-color: var(--color-emphatic);
  &_tiny {
    padding: 4px 8px;
    font-size: 10px;
    line-height: 12px;
  }
  &_small {
    padding: 6px 12px;
    font-size: 12px;
    line-height: 16px;
  }
  &_medium {
    padding: 8px 16px;
    font-size: 16px;
    line-height: 24px;
  }

  &_large {
    padding: 12px 24px;
    font-size: 24px;
    line-height: 32px;
  }
  &_big {
    padding: 16px 32px;
    font-size: 32px;
    line-height: 48px;
  }
  &_huge {
    font-size: 20px 40px;
    font-size: 40px;
    line-height: 72px;
  }

  &:focus {
    box-shadow: inset 0px 0px 0px 2px var(--color-emphatic);
  }

  &::selection {
    color: var(--color-primary-invert);
    background: var(--color-emphatic);
  }

  // weight
  &_light {
    font-weight: 200;
  }
  &_regular {
    font-weight: 400;
  }
  &_bold {
    font-weight: 600;
  }
}

.PasswordInput {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  .Input {
    border-radius: 0.5rem 0 0 0.5rem;
  }
}
</style>