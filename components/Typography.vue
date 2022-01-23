<template>
  <component :is="is" :class="classes" v-bind="$attrs"><slot></slot></component>
</template>

<script setup>
const props = defineProps({
  is: {
    type: String,
    default: 'div',
  },
  level: {
    type: String,
    default: 'default',
    class: true,
    validator(value) {
      return [
        'default',
        'primary',
        'secondary',
        'tertiary',
        'emphatic',
        'danger',
      ].includes(value)
    },
  },
  size: {
    type: String,
    default: 'medium',
    class: true,
    validator(value) {
      return [
        'tiny',
        'small',
        'small',
        'medium',
        'large',
        'big',
        'huge',
      ].includes(value)
    },
  },
  weight: {
    type: String,
    default: 'regular',
    class: true,
    validator(value) {
      return ['light', 'regular', 'bold'].includes(value)
    },
  },
})
const classes = defineClasses('Typo')
</script>

<style lang="scss">
.Typo {
  transition: font-size 200ms linear;
  // level
  &_default {
    color: currentColor;
  }
  &_primary {
    color: var(--color-primary);
  }
  &_secondary {
    color: var(--color-secondary);
  }
  &_emphatic {
    color: var(--color-emphatic);
  }

  &_tiny {
    font-size: 10px;
    line-height: 12px;
  }
  &_small {
    font-size: 12px;
    line-height: 16px;
  }
  &_medium {
    font-size: 16px;
    line-height: 24px;
  }
  &_large {
    font-size: 24px;
    line-height: 32px;
  }
  &_big {
    font-size: 32px;
    line-height: 48px;
  }
  &_huge {
    font-size: 48px;
    line-height: 72px;
  }

  // weight
  &_light {
    font-weight: 100;
  }
  &_regular {
    font-weight: 400;
  }
  &_bold {
    font-weight: 700;
  }
}
</style>