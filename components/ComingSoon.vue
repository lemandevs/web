<template>
  <div :class="classes">
    <span class="Title">LEMAN.DEV</span>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComingSoon')
const open = ref('asdf')
const widgetsSocialNetworksVisible = ref(true)
</script>

<style lang="scss">
@keyframes shine {
  0% {
    background-position: -0% center;
  }
  100% {
    background-position: 100% center;
  }
}

.Title {
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
  animation-play-state: running;
}

.ComingSoon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;
  flex-grow: 1;
  .Title {
    position: relative;
    font-size: 5em;
    font-size: clamp(1rem, 10vw, 5rem);
    background-color: transparent;
    color: transparent;
    background: linear-gradient(
        78deg,
        transparent calc(50% - 8px),
        var(--color-primary) calc(50% - 8px),
        var(--color-primary) calc(50% + 8px),
        transparent calc(50% + 8px)
      ),
      linear-gradient(
        to right,
        transparent 30%,
        rgba(var(--color-surface-rgb, 0.1)) 40%,
        var(--color-primary) calc(50% - 50px),
        var(--color-primary) calc(50% + 50px),
        rgba(var(--color-surface-rgb, 0.1)) 60%,
        transparent 70%
      );
    background-size: 200% auto;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation-name: shine;
  }
}
</style>