<template>
  <transition-group :class="classes" name="Beat" tag="div">
    <span
      v-for="beat in beats"
      :key="beat.id"
      :style="beatStyles(beat)"
      class="Beat Neon"
    />
  </transition-group>
</template>

<script>
import { nextTick } from 'vue'
let beatsCount = 111
export default {
  name: 'EffectClick',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      class: true,
    },
  },
  setup(props) {
    const classes = defineClasses('EffectClick')
    return { classes }
  },
  data() {
    return {
      beats: [],
    }
  },
  mounted() {
    this.$el.parentNode.addEventListener('click', this.onClick)
    this.$el.parentNode.addEventListener('touchstart', this.onClick)
    this.$el.parentNode.addEventListener('mouseenter', this.onMouseEnter)
  },
  unmounted() {
    this.$el.parentNode.removeEventListener('click', this.onClick)
    this.$el.parentNode.removeEventListener('touchstart', this.onClick)
    this.$el.parentNode.removeEventListener('mouseenter', this.onMouseEnter)
  },
  methods: {
    getRelativeEventPosition(event) {
      // e = Mouse click event.
      var rect = this.$el.getBoundingClientRect()
      const clickCoordinateX = event.clientX
        ? event.clientX - rect.left
        : this.$el.offsetWidth / 2
      const clickCoordinateY = event.clientX
        ? event.clientY - rect.top
        : this.$el.offsetHeight / 2
      return {
        top: clickCoordinateY,
        left: clickCoordinateX,
      }
    },
    beat(position) {
      const beatPosition = this.prosition || position
      const id = beatsCount++
      this.beats = [...this.beats, { ...beatPosition, id }]
      nextTick(() => {
        this.beats = this.beats.filter((beat) => beat.id !== id)
      })
    },
    onMouseEnter(event) {
      this.beat(this.getRelativeEventPosition(event))
    },
    onClick(event) {
      this.beat(this.getRelativeEventPosition(event))
    },
    beatStyles(beat) {
      return {
        top: `${beat.top}px`,
        left: `${beat.left}px`,
      }
    },
  },
}
</script>

<style lang="scss">
.EffectClick {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  .Beat {
    position: absolute;
    width: 64px;
    height: 64px;
    background-color: currentColor;
    opacity: 0.3;
    border-radius: 9999px;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center center;
  }

  .Beat-enter-active,
  .Beat-leave-active {
    transition-property: all;
    transition-duration: 1000ms;
    transition-timing-function: linear;
    transform: translate3d(-50%, -50%, 0) scale(5);
    opacity: 0;
  }
}
</style>