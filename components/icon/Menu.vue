<template>
  <div class="MenuIcon">
    <div class="Shape"></div>
    <div class="Shape"></div>
    <div class="Shape"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.MenuIcon {
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
      top: 0;
      --translate-y: 0%;
      --translate-x: 0%;
      --rotate: 0;
      transform-origin: center;
      transform: translate3d(var(--translate-x), var(--translate-y), 0)
        rotate(var(--rotate));
    }
    &:nth-child(2) {
      top: 50%;
      --translate-y: -50%;
      --translate-x: 0%;
      --rotate: 0;
      transform: translate3d(var(--translate-x), var(--translate-y), 0)
        rotate(var(--rotate));
    }
    &:last-child {
      top: 100%;
      --translate-y: -100%;
      --translate-x: 0%;
      --rotate: 0;
      transform-origin: center;
      transform: translate3d(var(--translate-x), var(--translate-y), 0)
        rotate(var(--rotate));
    }
  }

  .Icon_active & .Shape {
    &:first-child {
      top: 50%;
      --translate-y: -50%;
      --rotate: -45deg;
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:last-child {
      top: 50%;
      --translate-y: -50%;
      --rotate: 45deg;
    }
  }
}
</style>