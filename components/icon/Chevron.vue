<template>
  <div :class="classes">
    <span class="Shape"></span>
    <span class="Shape"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    class: true,
  },
})
const classes = defineClasses('ChevronIcon')
</script>

<style lang="scss" scoped>
.ChevronIcon {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  .Shape {
    position: absolute;
    width: 66%;
    height: 20%;
    border-radius: 9999px;
    top: 50%;
    background: currentColor;
    transition-property: color, transform;
    transition-timing-function: ease-in-out;
    transition-duration: 0.3s;
    &:first-child {
      left: 0;
      transform: translateY(-50%) rotate(45deg);
    }
    &:last-child {
      right: 0;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
  &_active .Shape {
    &:first-child {
      transform: translateY(-50%) rotate(-45deg);
    }
    &:last-child {
      transform: translateY(-50%) rotate(45deg);
    }
  }
}
</style>