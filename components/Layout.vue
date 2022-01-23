<template>
  <div :class="classes">
    <slot></slot>
    <div id="Overlays" />
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'clear',
    class: true,
  },
})
const classes = defineClasses('Layout')
</script>

<style lang="scss">
.Layout {
  --layout-bg-color: var(--color-background);
  --layout-bg-from-gradient-color: var(--color-background);
  --layout-bg-to-gradient-color: var(--color-surface);
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-background);

  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  .Content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex: 1 1 0%;
  }

  #Overlays {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
    :not(:empty):before {
      content: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  #Overlays > * {
    pointer-events: auto;
  }
}
</style>