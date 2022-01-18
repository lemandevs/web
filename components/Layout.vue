<template>
  <div :class="classes">
    <div class="WaterMark">Leman.dev</div>
    <slot></slot>
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
  --layout-bg-color: rgba(26, 26, 99, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;

  background-color: var(--bg-primary);

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
  }

  #Overlays > * {
    pointer-events: auto;
  }
  .WaterMark {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    font-size: 0.5em;
    padding: 0.5em 1em;
    color: black;
    border: 1px solid black;
    border-radius: 4px;
    opacity: 0.1;
    box-shadow: 0px 0px 4px 0px black;
  }
}
</style>