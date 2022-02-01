<template>
  <div :class="classes">
    <transition-group
      appear
      name="Presentation"
      enter-from-class="Presentation-enter-from"
      enter-active-class="Presentation-enter-active"
      enter-to-class="Presentation-enter-to"
      leave-from-class="Presentation-leave-from"
      leave-active-class="Presentation-leave-active"
      leave-to-class="Presentation-leave-to"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <EffectText v-if="showText" :effect="['gradient']">LEMAN.DEV</EffectText>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'Collapse',
  data() {
    return {
      showText: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showText = true
    }, 0)
  },
  unmounted() {
    this.showText = false
  },
  methods: {
    beforeEnter(element) {
      gsap.set(element, {})
    },
    enter(element, done) {
      console.log('enter')
      gsap.to(element, {
        onComplete: done,
      })
    },
    afterEnter(element) {},
    beforeLeave(element) {},
    leave(element, done) {
      console.log('leave')
      gsap.to(element, {
        onComplete: done,
      })
    },
    afterLeave(element) {},
  },
}
</script>

<script setup>
const props = defineProps({})
const classes = defineClasses('Presentation')
</script>

<style lang="scss">
.Presentation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;
  flex-grow: 1;
}

.Presentation {
  overflow: hidden;
}
.Presentation-enter-from {
  height: 0;
}
</style>