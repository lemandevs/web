<template>
  <div :class="classes">
    <span class="Title"> LEMAN.DEV </span>
    <CssAbsolute position="bottom" align="end" :offsetX="24" :offsetY="24">
      <ClientOnly>
        <WidgetsSocialNetworks />
      </ClientOnly>
    </CssAbsolute>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComingSoon')
const open = ref('asdf')
const widgetsSocialNetworksVisible = ref(true)
</script>

<style lang="scss">
@keyframes shadow {
  0% {
    background-position: -0% center;
  }
  100% {
    background-position: 100% center;
  }
}
@keyframes shine {
  0% {
    background-position: -0% center;
  }
  100% {
    background-position: 100% center;
  }
}
@keyframes light {
  0% {
    left: 100%;
  }
  100% {
    left: -20%;
  }
}
@keyframes reflect {
  0% {
    left: -20%;
  }
  100% {
    left: 100%;
  }
}
.SSNNLink {
  transition: color 0.3s ease-in-out;
  padding: 1rem;
  color: var(--color-primary);
  &:hover {
    color: var(--color-emphatic);
  }
}

.Title,
.Title:before,
.Title:after,
.Light {
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
    &:before {
      content: attr(data-text);
      z-index: -1;

      position: absolute;
      left: 0;
      top: -20px;

      color: black;
      font-size: 5em;
      font-size: clamp(1rem, 10vw, 5rem);

      background-color: transparent;
      background: linear-gradient(
        to right,
        transparent 30%,
        rgba(var(--color-surface-rgb, 0.1)) 40%,
        black calc(50% - 50px),
        black calc(50% + 50px),
        rgba(var(--color-surface-rgb, 0.1)) 60%,
        transparent 70%
      );
      background-size: 200% auto;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      animation-name: shadow;
    }
    .Reflect,
    .Light {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 100px;
      height: 100px;
      border-radius: 9999px;
      opacity: 0.2;
    }

    .Light {
      filter: blur(100px);
      background: white;
      animation-name: light;
      box-shadow: 0px 0px 45px 45px white, 0px 0px 100px 100px white,
        inset 0px 0px 45px 45px white;
      opacity: 0.2;
    }
    .Reflect {
      display: none;
      animation-name: light;
      animation-direction: alternate-reverse;
      box-shadow: 0px 0px 2px 2px red, inset 0px 0px 2px 2px red,
        inset 0px 0px 1px 1px red;
      width: 100px;
      height: 100px;
      background: red;
    }
  }
}
</style>