<template>
  <transition
    name="Collapse"
    enter-from-class="Collapse-enter-from"
    enter-active-class="Collapse-enter-active"
    enter-to-class="Collapse-enter-to"
    leave-from-class="Collapse-leave-from"
    leave-active-class="Collapse-leave-active"
    leave-to-class="Collapse-leave-to"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'Collapse',
  methods: {
    beforeEnter(element) {
      gsap.set(element, {
        height: element.style.height || 0,
        overflow: 'hidden',
        opacity: 0,
        scaleY: 0.95,
      })
    },
    enter(element, done) {
      gsap.to(element, {
        duration: 0.3,
        opacity: 1,
        height: element.scrollHeight,
        scaleY: 1,
        onComplete: done,
      })
    },
    leave(element, done) {
      gsap.to(element, {
        duration: 0.3,
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        scaleY: 0.95,
        onComplete: done,
      })
    },
  },
}
</script>

<style lang="scss">
.Collapse {
  overflow: hidden;
}
.Collapse-enter-from {
  height: 0;
}
</style>