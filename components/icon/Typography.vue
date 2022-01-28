<template>
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    stroke="#000000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    baseProfile="full"
  >
    <path d="M4 8L5 4H12M20 8L19 4H12M12 4V20M12 20H8M12 20H16" />
  </svg>
</template>

<script setup>
const props = defineProps({
  prop: {
    type: String,
    default: 'value',
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('TypographyIcon')
</script>

<style lang="scss">
.TypographyIcon {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}
</style>