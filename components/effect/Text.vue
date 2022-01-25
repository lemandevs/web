<template>
  <span :class="classes">
    <span class="Text"><slot></slot></span>
  </span>
</template>

<script setup>
const props = defineProps({
  effect: {
    type: Array,
    default: ['gradient', 'shadow'],
    class: true,
    validator(value) {
      return value.every((effect) =>
        ['gradient', 'reflect', 'shadow'].includes(effect)
      )
    },
  },
})
const classes = defineClasses('EffectText')
</script>

<style lang="scss">
@keyframes shine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.EffectText {
  font-family: 'Krona One', sans-serif;
  position: relative;
  font-size: 5em;
  font-size: clamp(1rem, 10vw, 5rem);
  .Text {
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
  }
  &[class*='reflect'] {
    .Text {
      animation-duration: 5s;
      background-color: transparent;
      color: transparent;
      background: linear-gradient(
          78deg,
          transparent calc(50% - 16px),
          var(--color-primary) calc(50% - 8px),
          var(--color-primary) calc(50% + 8px),
          transparent calc(50% + 16px)
        ),
        linear-gradient(
          to right,
          transparent 30%,
          rgba(var(--color-surface-rgb, 0.1)) 40%,
          var(--color-secondary) calc(50% - 50px),
          var(--color-secondary) calc(50% + 50px),
          rgba(var(--color-surface-rgb, 0.1)) 60%,
          transparent 70%
        );
      background-size: 200% auto;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation-name: shine;
    }
  }
  &[class*='gradient'] {
    .Text {
      background: linear-gradient(
        to right,
        var(--color-primary) 0%,
        var(--color-emphatic) 100%
      );
      background-size: 100% auto;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &[class*='shadow'] {
    .Text {
      animation-name: pulse;
      animation-duration: 1s;
    }
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      width: 100%;
      height: 25%;
      background: var(--color-emphatic);
      border-radius: 100%;
      box-shadow: 0 0 15px 30px var(--color-emphatic);
      opacity: 0.05;
    }
    &:before {
      top: 100%;
      transform: translate3d(-50%, 100%, 0);
    }
  }
}
</style>