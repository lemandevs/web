<template>
  <OverlayDropdown
    class="SelectDropdown"
    position="bottom"
    align="start"
    width="target"
    :visible="focused"
    :offsetY="4"
    @close="onBlur"
  >
    <template v-slot:target>
      <div :class="classes">
        <FormInput
          :readOnly="!filterable"
          class="SelectInput"
          :size="size"
          v-bind="$attrs"
          autocomplete="off"
          ref="value"
          :placeholder="inputPlaceholder"
          v-model:value="inputValue"
          @mousedown="onFocus"
          @focus="onFocus"
          @blur="onBlur"
        />
        <div v-if="clearable" class="relative">
          <CssAbsolute position="right" align="center" :offsetX="4">
            <Btn
              tabIndex="-1"
              class="SelectBtn"
              icon="Menu"
              active
              variant="clear"
              level="secondary"
              size="small"
              @click="clear"
            />
          </CssAbsolute>
        </div>
        <Btn
          tabIndex="-1"
          class="SelectBtn"
          icon="Chevron"
          variant="clear"
          level="primary"
          :active="focused"
          :size="size"
          @click="(event) => (focused ? blur(event) : focus(event))"
        />
      </div>
    </template>
    <template v-slot:content>
      <Menu key="SelectOptions" variant="underline" class="SelectOptions">
        <MenuItem
          class="SelectOption"
          v-for="(option, index) in filteredOptions"
          :key="option.id || index"
          :size="size"
          @touchstart="() => select(option)"
          @mousedown="() => select(option)"
        >
          <FormCheckbox
            v-if="multiple"
            size="small"
            :value="isSelectedOption(option)"
          />
          <Icon
            v-if="option.icon"
            :active="isSelectedOption(option)"
            :name="option.icon"
          />
          <Typography
            :size="size"
            :level="isSelectedOption(option) ? 'emphatic' : 'primary'"
            class="OverflowText"
          >
            <EffectClick />
            {{ option.label || option }}
          </Typography>
        </MenuItem>
        <MenuItem v-if="noOptions" class="SelectOption" :size="size">
          There are no options
        </MenuItem>
      </Menu>
    </template>
  </OverlayDropdown>
</template>

<script>
const compareOptionByValue = (option, value) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option === value
  }
  if (option instanceof Object) {
    return option.value === value
  }
}

const compareOptionByValues = (option, values) => {
  return values.find((value) => compareOptionByValue(option, value))
}

const getOptionLabel = (option) => {
  return option?.label || option
}

const getOptionValue = (option) => {
  return option.value || option
}

export default {
  name: 'Select',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Array],
      default: () => '',
    },
    options: {
      type: Array,
      required: true,
      default: () => ['a', 'b'],
    },
    size: {
      type: String,
      class: true,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    placeholder: {
      default: 'Select something',
      type: String,
    },
    /**
     * If true, value can be cleared
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * If true, allow filter options by keywords
     */
    filterable: {
      type: Boolean,
      default: false,
    },
    /**
     * If true, allow select multiple options
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = defineClasses('Select')
    return { classes }
  },
  data() {
    return {
      focused: false,
      timeout: null,
      filter: '',
    }
  },
  computed: {
    noOptions() {
      return !this.options || !this.options.length
    },
    selectedOption() {
      return this.options.find((option) =>
        compareOptionByValue(option, this.value)
      )
    },
    selectedOptions() {
      return this.options.filter((option) =>
        compareOptionByValue(option, this.value)
      )
    },
    sanitizedLabel() {
      return this.multiple
        ? this.selectedOptions.map(getOptionLabel).join(', ')
        : getOptionLabel(this.selectedOption)
    },
    inputPlaceholder() {
      return this.focused && this.filterable
        ? 'Search something'
        : this.placeholder
    },
    inputValue: {
      get() {
        return this.focused && this.filterable
          ? this.filter
          : this.sanitizedLabel
      },
      set(value) {
        this.filter = value
      },
    },
    classes() {
      return [
        ...this.classes,
        {
          [`Select_focused`]: this.focused,
        },
      ]
    },
    filteredOptions() {
      return this.options.filter((option) =>
        option.label
          ? option.label.includes(this.filter)
          : option.includes(this.filter)
      )
    },
    rootClass() {
      return { 'w-full': true }
    },
  },
  methods: {
    isSelectedOption(option) {
      return this.multiple
        ? compareOptionByValues(option, this.value)
        : compareOptionByValue(option, this.value)
    },
    select(option) {
      if (this.multiple) {
        this.$emit('update:value', [...this.value, getOptionValue(option)])
      } else {
        this.$emit('update:value', getOptionValue(option))
      }
      this.focused = false
    },
    clear() {
      this.$emit('update:value', undefined)
      this.focused = false
    },
    onBlur(event) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.focused = false
        this.filter = ''
        this.$emit('blur', event)
      }, 300)
    },
    onFocus(event) {
      clearTimeout(this.timeout)
      this.filter = ''
      this.focused = true
      this.$emit('focus', event)
    },
    onFilterFocus(event) {
      clearTimeout(this.timeout)
    },
    onFilterBlur(event) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.focused = false
      }, 300)
    },
    focus() {
      this.$refs.value.focus()
    },
    blur() {
      this.$refs.value.blur()
    },
    focusFilter() {
      this.$refs.filter.focus()
    },
  },
}
</script>

<style lang="scss">
.SelectOptions {
  box-shadow: inset 0px 0px 0px 2px var(--color-emphatic);
  backdrop-filter: blur(50px);
  background: var(--color-surface);
  border-radius: 8px;
  padding: 2px;
  .SelectOption {
    cursor: pointer;
    overflow: hidden;
  }
}

.Select {
  display: flex;
  align-items: stretch;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;

  .SelectInput {
    border-radius: 0.5rem 0 0 0.5rem;
    padding-right: 3rem;
  }
}
</style>