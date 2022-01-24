<template>
  <transition-group
    name="TransitionGroupAccordionList"
    tag="ul"
    v-bind:css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transform = `translate3d(0, 0, 0)`
    },
    enter: function (el, done) {
      const index = Array.prototype.indexOf.call(el.parentNode.children, el)
      var delay = index * 150

      setTimeout(function () {
        el.style.transform = `translate3d(${100 * (index + 1)}%, 0, 0)`
        el.style.opacity = 1
      }, delay)
    },
    leave: function (el, done) {
      const index = Array.prototype.indexOf.call(el.parentNode.children, el)
      var delay = index * 150
      setTimeout(function () {
        el.style.transform = `translate3d(0, 0, 0)`
        el.style.opacity = 0
      }, delay)
    },
  },
}
</script>

<style lang="scss">
.TransitionGroupAccordionList {
}
</style>