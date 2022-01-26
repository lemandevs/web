<template>
  <div :class="classes">
    <div class="Text" :data-title="title">
      <slot></slot>
      <div v-if="effect.includes('shadow')" class="Shadow" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Leman.dev',
  },
  effect: {
    type: Array,
    default: ['gradient', 'bounce'],
    class: true,
    validator(value) {
      return value.every((effect) =>
        ['gradient', 'reflect', 'shadow', 'bounce', 'layers'].includes(effect)
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
@keyframes increase {
  0% {
    width: 100%;
  }
  100% {
    width: 110%;
  }
}
@keyframes bounce {
  0% {
    transform: scale(1.1) translate3d(0, -10%, 0);
  }
  100% {
    transform: scale(1) translate3d(0, 0%, 0);
  }
}

.EffectText {
  font-family: 'Krona One', sans-serif;
  position: relative;
  font-size: 5em;
  font-size: clamp(1rem, 10vw, 5rem);
  letter-spacing: 8px;
  .Text,
  .Shadow {
    display: block;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
    animation-name: pulse;
    animation-duration: 5s;
  }
  &[class*='reflect'] {
    .Text {
      color: transparent;
      background-color: transparent;
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

      animation-duration: 5s;
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
  &[class*='bounce'] {
    .Text {
      animation-name: bounce;
      animation-iteration-count: 1;
    }
    .Shadow {
      animation-name: increase;
    }
  }
  &[class*='shadow'] {
    .Shadow {
      content: '';
      position: absolute;
      left: 50%;
      width: 100%;
      height: 50%;
      background: var(--color-emphatic);
      border-radius: 100%;
      opacity: 0.05;
    }
    .Shadow {
      top: 100%;
      transform: translate3d(-50%, 100%, 0);
    }
  }
  &[class*='layers'] {
    .Text {
      display: block;
      color: var(--color-emphatic);
      cursor: pointer;
      position: relative;
      &::before {
        display: block;
        content: 'LEMAN.DEV';
        position: absolute;
        color: transparent;
        background-image: repeating-linear-gradient(
          45deg,
          transparent 0,
          transparent 2px,
          var(--color-primary) 2px,
          var(--color-primary) 4px
        );
        -webkit-background-clip: text;
        top: 0px;
        left: 0;
        z-index: -1;
        transition: 1s;
      }
      &::after {
        content: 'LEMAN.DEV';
        position: absolute;
        color: transparent;
        background-image: repeating-linear-gradient(
          135deg,
          transparent 0,
          transparent 2px,
          var(--color-primary) 2px,
          var(--color-primary) 4px
        );
        -webkit-background-clip: text;
        top: 0px;
        left: 0px;
        transition: 1s;
      }
      &:hover:before {
        top: 10px;
        left: 10px;
      }

      &:hover:after {
        top: -10px;
        left: -10px;
      }
    }
  }
}
</style>