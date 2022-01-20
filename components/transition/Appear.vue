<template>
  <transition :name="name" appear>
    <slot></slot>
  </transition>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Appear',
  props: {
    zoom: {
      type: String,
      default: null,
    },
  },
  computed: {
    name() {
      return `Appear${this.zoom ? _.capitalize(this.zoom) : ''}`
    },
  },
}
</script>

<style lang="scss">
.Appear-enter-active,
.Appear-leave-active,
.AppearIn-enter-active,
.AppearIn-leave-active,
.AppearOut-enter-active,
.AppearOut-leave-active {
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
}

.Appear-enter-from,
.Appear-leave-to {
  pointer-events: none !important;
  opacity: 0;
}

.AppearIn-enter-from,
.AppearIn-leave-to {
  pointer-events: none !important;
  opacity: 0;
  transform: scale(0.95);
}

.AppearOut-enter-from,
.AppearOut-leave-to {
  pointer-events: none !important;
  opacity: 0;
  transform: scale(1.05);
}
</style>