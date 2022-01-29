<template>
  <div class="CrossIcon">
    <div class="Shape"></div>
    <div class="Shape"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.CrossIcon {
  position: relative;
  width: 100%;
  height: 100%;
  .Shape {
    width: 100%;
    position: absolute;
    border-radius: 9999px;
    height: 20%;
    transition-property: all;
    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
    &:first-child {
      top: 50%;
      transform-origin: center;
      transform: translate3d(0, -50%, 0) rotate(-45deg);
    }
    &:last-child {
      top: 50%;
      transform-origin: center;
      transform: translate3d(0, -50%, 0) rotate(45deg);
    }
  }
}
</style>