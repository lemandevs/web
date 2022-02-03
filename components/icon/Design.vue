<template>
  <svg
    :class="classes"
    viewBox="0 0 36 36"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <polygon
      points="9 17.41 9 27 18.59 27 16.59 25 11 25 11 19.41 9 17.41"
    ></polygon>
    <path
      d="M34.87,32.29,32,29.38V32H4V27.85H6v-1.6H4V19.6H6V18H4V11.6H6V10H4V4.41L19.94,20.26V17.44L3.71,1.29A1,1,0,0,0,2,2V33a1,1,0,0,0,1,1H34.16a1,1,0,0,0,.71-1.71Z"
    ></path>
    <path
      d="M24,30h4a2,2,0,0,0,2-2V8.7L27.7,4.47a2,2,0,0,0-1.76-1h0a2,2,0,0,0-1.76,1.08L22,8.72V28A2,2,0,0,0,24,30ZM24,9.2l1.94-3.77L28,9.21V24H24Zm0,16.43h4v2.44H24Z"
    ></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
  </svg>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
const classes = defineClasses('DesignIcon')
</script>

<style lang="scss">
.DesignIcon {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>