<template>
  <transition :name="name" appear="appear">
    <slot></slot>
  </transition>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'AppearFrom',
  props: {
    from: {
      type: String,
      default: 'right',
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      return `AppearFrom${_.capitalize(this.from)}`
    },
  },
}
</script>

<style lang="scss">
.AppearFromRight-enter-active,
.AppearFromRight-leave-active,
.AppearFromLeft-enter-active,
.AppearFromLeft-leave-active,
.AppearFromTop-enter-active,
.AppearFromTop-leave-active,
.AppearFromBottom-enter-active,
.AppearFromBottom-leave-active,
.AppearFromIn-enter-active,
.AppearFromIn-leave-active,
.AppearFromOut-enter-active,
.AppearFromOut-leave-active {
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}

.AppearFromLeft-enter-from,
.AppearFromLeft-leave-to,
.AppearFromRight-enter-from,
.AppearFromRight-leave-to,
.AppearFromTop-enter-from,
.AppearFromTop-leave-to,
.AppearFromBottom-enter-from,
.AppearFromBottom-leave-to,
.AppearFromIn-enter-from,
.AppearFromIn-leave-to,
.AppearFromOut-enter-from,
.AppearFromOut-leave-to {
  pointer-events: none !important;
  opacity: 0;
}

.AppearFromLeft-enter-from,
.AppearFromLeft-leave-to {
  transform: translateX(-100%);
}

.AppearFromRight-enter-from,
.AppearFromRight-leave-to {
  transform: translateX(100%);
}

.AppearFromTop-enter-from,
.AppearFromTop-leave-to {
  transform: translateY(-100%);
}

.AppearFromBottom-enter-from,
.AppearFromBottom-leave-to {
  transform: translateY(100%);
}

.AppearFromIn-enter-from,
.AppearFromIn-leave-to {
  transform: scale(0.95);
}

.AppearFromOut-enter-from,
.AppearFromOut-leave-to {
  transform: scale(1.05);
}
</style>