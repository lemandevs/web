<template>
  <label :class="fieldClasses" :for="name">
    <Typography
      v-if="label"
      class="FieldLabel"
      is="span"
      :size="focused || value || type === 'switch' ? 'small' : size"
    >
      {{ label }}
    </Typography>
    <FormSelect
      v-if="type === 'select'"
      class="FieldInput"
      v-bind="$attrs"
      :id="name"
      :name="name"
      :size="size"
      v-model:value="value"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div v-else-if="type === 'switch'" class="SwitchFieldInput">
      <FormSwitch
        v-bind="$attrs"
        :id="name"
        :name="name"
        :size="size"
        v-model:value="value"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <FormInput
      class="FieldInput"
      v-else
      v-bind="$attrs"
      :id="name"
      :name="name"
      :size="size"
      :type="type"
      v-model:value="value"
      @focus="onFocus"
      @blur="onBlur"
    />
    <Typography
      v-if="error"
      is="p"
      class="Error"
      size="tiny"
      level="danger"
      weight="light"
    >
      {{ error }}
    </Typography>
    <Typography
      v-if="hint && !error"
      is="p"
      class="Hint"
      size="tiny"
      level="tertiary"
      weight="light"
    >
      {{ hint }}
    </Typography>
  </label>
</template>

<script>
/**
 *  Fields are what enable users to fill in a form. Exists differents types of fields: text, password
 */
export default {
  name: 'Field',
  inheritAttrs: false,
  props: {
    alias: {
      type: String,
      default: 'Field',
    },
    class: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'name',
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      required: true,
      validator(value) {
        return ['text', 'password', 'select', 'switch'].includes(value)
      },
    },
    value: {
      type: [Number, String, Boolean],
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'column',
      validator(value) {
        return ['column', 'row'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
  data() {
    return { focused: false }
  },
  computed: {
    empty() {
      return (
        this.value === undefined ||
        this.value === null ||
        this.value === '' ||
        (this.value && this.value.length === 0)
      )
    },
    fieldClasses() {
      return [
        ...this.classes,
        {
          [`Field_focused`]: this.focused,
          [`Field_empty`]: this.empty,
          [`Field_noLabel`]: !this.label,
          [`Field_floatLabel`]:
            this.type !== 'switch' && this.empty && !this.focused,
        },
      ]
    },
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      },
    },
  },
  setup(props) {
    const classes = defineClasses('Field')
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
  },
}
</script>

<style lang="scss">
.Field {
  position: relative;
  display: flex;
  flex-direction: column;

  .FieldLabel,
  .Hint,
  .Error {
    position: absolute;
    padding-left: 16px;
  }

  .FieldLabel {
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    animation-duration: 200ms;
    animation-timing-function: linear;
    cursor: pointer;
    color: var(--color-secondary);
    transition-property: color, top, transform, font-size, line-height;
    transition-duration: 200ms;
    transition-timing-function: linear;
    &:hover {
      color: var(--text-emphatic);
    }
  }

  .Error,
  .Hint {
    opacity: 0;
    transition-property: color;
    transition-duration: 200ms;
    transition-timing-function: linear;
    bottom: 0;
    transform: translateY(100%);
  }
  /* Hint is hidden and only show when mouse is hover of field is focused */
  .Hint {
    opacity: 0;
  }
  &_focused .Hint,
  &:hover .Hint {
    opacity: 1;
  }

  /**
   * If error and hint, only error is shown
   */
  &:hover .Error ~ .Hint {
    opacity: 0;
  }

  .SwitchFieldInput {
    padding-top: 1.75rem;
    padding-bottom: 0.25rem;
    padding-left: 1rem;
  }
  .FieldInput {
    padding: 1rem;
    transition-property: padding, color;
    transition-duration: 200ms;
    transition-timing-function: linear;
    &::placeholder {
      transition-property: opacity, color;
      transition-duration: 200ms;
      transition-timing-function: linear;
      opacity: 0;
    }

    &:focus:placeholder-shown::placeholder {
      opacity: 1;
    }
  }

  &.Field_empty:not(.Field_focused) .FieldLabel {
    cursor: text;
  }
  &.Field_empty:not(.Field_focused) .FieldInput::placeholder {
    color: transparent !important;
  }

  &.Field_focused .FieldLabel,
  &:not(.Field_empty) .FieldLabel {
    top: 0.25rem;
    transform: translateY(0);
  }
  &.Field_focused .FieldInput,
  &:not(.Field_empty) .FieldInput {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    opacity: 1;
    color: var(--text-primary);
  }

  &.Field_noLabel .FieldInput {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    opacity: 1;
  }
}

.Field {
  margin-bottom: 1rem;
}
</style>