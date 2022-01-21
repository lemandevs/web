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
.AppearFromBottom-leave-active {
  @apply transition-all ease-in-out duration-1000;
}

.AppearFromLeft-enter-from,
.AppearFromLeft-leave-to {
  opacity: 0;
  @apply -translate-x-full;
}

.AppearFromRight-enter-from,
.AppearFromRight-leave-to {
  opacity: 1;
  @apply translate-x-full;
}

.AppearFromTop-enter-from,
.AppearFromTop-leave-to {
  opacity: 0;
  @apply -translate-y-full;
}

.AppearFromBottom-enter-from,
.AppearFromBottom-leave-to {
  opacity: 1;
  @apply translate-y-full;
}
</style>