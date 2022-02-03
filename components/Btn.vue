<template>
  <NuxtLink
    v-if="to"
    :to="to"
    v-slot="{ isExactActive, navigate }"
    :class="classes"
    active-class="Button_visited"
    exact-active-class="Button_active"
    @click="navigate"
  >
    <EffectClick />
    <Icon
      class="ButtonIcon"
      v-if="iconAfter"
      :name="icon"
      :variant="variant"
      :level="level"
      :active="active || isExactActive"
      :size="size"
    />
    <slot></slot>
    {{ text }}
    <Icon
      class="ButtonIcon"
      v-if="icon && !iconAfter"
      :name="icon"
      :variant="variant"
      :level="level"
      :active="active"
      :size="size"
    />
    <TransitionAppearFrom>
      <Icon
        v-show="loading"
        name="Loader"
        class="ButtonLoader Absolute_center"
        :size="size"
      />
    </TransitionAppearFrom>
  </NuxtLink>
  <button v-else :class="classes" :disabled="loading">
    <EffectClick />
    <slot></slot>
    {{ text }}
    <Icon
      class="ButtonIcon"
      v-if="icon"
      :name="icon"
      :variant="variant"
      :level="level"
      :active="active"
      :size="size"
    />
    <TransitionAppearFrom>
      <Icon
        v-show="loading"
        name="Loader"
        class="ButtonLoader Absolute_center"
        :size="size"
      />
    </TransitionAppearFrom>
  </button>
</template>

<script setup>
/**
 * Component description
 */
const props = defineProps({
  /**
   * Variant description
   */
  variant: {
    type: String,
    default: 'clear',
    class: true,
    validator(value) {
      return ['clear', 'fill', 'bordered'].includes(value)
    },
  },
  /**
   * rounded description
   */
  rounded: {
    type: Boolean,
    class: true,
    default: false,
  },
  /**
   * Level description
   */
  level: {
    type: String,
    default: 'primary',
    class: true,
    validator(value) {
      return ['emphatic', 'primary', 'secondary', 'danger'].includes(value)
    },
  },
  /**
   * Size description
   */
  size: {
    type: String,
    default: 'medium',
    class: true,
    validator(value) {
      return ['tiny', 'small', 'medium', 'large', 'big', 'huge'].includes(value)
    },
  },
  direction: {
    type: String,
    default: 'row',
    class: true,
    validator(value) {
      return ['row', 'column'].includes(value)
    },
  },
  /**
   * Alias description
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * Icon description
   */
  icon: {
    type: String,
    default: null,
  },
  iconAfter: {
    type: Boolean,
    default: false,
  },
  /**
   * Loading description
   */
  loading: {
    type: Boolean,
    class: true,
    default: false,
  },
  /**
   * Active description
   */
  active: {
    type: Boolean,
    class: true,
    default: false,
  },
  to: {
    type: String,
  },
})
const classes = defineClasses('Button')
</script>

<style lang="scss">
.Button {
  outline: none;
  display: inline-flex;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &,
  &:before,
  .Shape,
  .ButtonIcon,
  .ButtonContent {
    transition-property: all;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
  }

  &[class*='tiny'] {
    min-height: 2rem;
    min-width: 2rem;
  }

  &[class*='small'] {
    min-height: 2.5rem;
    min-width: 2.5rem;
  }

  &[class*='medium'] {
    min-height: 3rem;
    min-width: 3rem;
  }

  &[class*='large'] {
    min-height: 3.5rem;
    min-width: 3.5rem;
  }

  &[class*='big'] {
    min-height: 4rem;
    min-width: 4rem;
  }

  &[class*='huge'] {
    min-height: 6rem;
    min-width: 6rem;
  }

  &[class*='rounded'] {
    border-radius: 6rem;
  }

  &[class*='clear'] {
    --bg-opacity: 0;
    --btn-color: var(--bg-primary);
    --btn-bg: var(--color-primary);
    color: var(--btn-color);
    background-color: rgba(var(--btn-bg), var(--bg-opacity));
    &:hover {
      --bg-opacity: 0.25;
    }
    &:focus {
      --bg-opacity: 0.25;
    }
  }

  &[class*='emphatic'] {
    &:focus {
      transform: scale(1.15);
    }
    &[class*='fill'] {
      --bg-opacity: 1;
      --btn-color: var(--bg-primary);
      --btn-bg: var(--color-emphatic);
      &:focus,
      &:active,
      &:hover {
        box-shadow: 0px 0px 2px 2px var(--color-emphatic),
          0px 0px 4px 4px var(--color-emphatic);
      }
    }
    &[class*='clear'] {
      --bg-opacity: 0;
      --btn-color: var(--bg-emphatic);
      --btn-bg: var(--color-emphatic);
      &:focus,
      &:active,
      &:hover {
        --bg-opacity: 0.25;
      }
    }
    &[class*='active'],
    &:active {
      --bg-opacity: 0.5;
      transform: scale(1.15);
      box-shadow: 0px 0px 2px 2px var(--color-emphatic),
        0px 0px 4px 4px var(--color-emphatic);
    }
  }

  &[class*='primary'] {
    &[class*='fill'] {
      color: var(--color-on-primary);
      background-color: var(--color-primary);
    }
    &[class*='clear'] {
      --bg-opacity: 0;
      color: var(--color-primary);
      background-color: rgba(var(--color-primary-rgb), var(--bg-opacity));
      &:hover {
        --bg-opacity: 0.25;
      }
      &:focus {
        --bg-opacity: 0.25;
      }
      &[class*='active'],
      &:active {
        --bg-opacity: 0.5;
      }
    }
  }
  &[class*='secondary'] {
    &[class*='fill'] {
      color: var(--bg-secondary);
      background-color: var(--color-secondary);
      &:focus,
      &:active,
      &:hover {
        --bg-opacity: 1;
      }
    }
    &[class*='clear'] {
      --bg-opacity: 0;
      color: var(--text-secondary);
      background-color: rgba(var(--color-secondary-rgb), var(--bg-opacity));
      &:focus,
      &:active,
      &:hover {
        --bg-opacity: 0.25;
      }
    }
  }

  &_loading > *:not(.ButtonLoader) {
    opacity: 0;
  }

  &_text {
    &_tiny {
      padding: 0 0.75rem;
      .ButtonIcon {
        margin-left: 0.75rem;
      }
    }
    &_small {
      padding: 0 1rem;
      .ButtonIcon {
        margin-left: 1rem;
      }
    }
    &_medium {
      padding: 0 1.5rem;
      .ButtonIcon {
        margin-left: 1.5rem;
      }
    }
    &_large {
      padding: 0 2rem;
      .ButtonIcon {
        margin-left: 2rem;
      }
    }
    &_big {
      padding: 0 2.5rem;
      .ButtonIcon {
        margin-left: 2.5rem;
      }
    }
    &_huge {
      padding: 0 3rem;
      .ButtonIcon {
        margin-left: 3rem;
      }
    }
  }

  &_icon {
    padding: 0;
    &_tiny {
      width: 2rem;
    }
    &_small {
      width: 2.5rem;
    }
    &_medium {
      width: 3rem;
    }
    &_large {
      width: 3.5rem;
    }
    &_big {
      width: 4rem;
    }
    &_huge {
      width: 6rem;
    }
  }

  &_row {
    flex-direction: row;
  }

  &_column {
    flex-direction: column;
    padding: 8px 16px;
  }
}
</style>