<template>
  <svg
    viewBox="0 0 24 24"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    baseProfile="full"
  >
    <path
      fill="currentColor"
      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    class: true,
  },
})
const classes = defineClasses('YouTubeIcon')
</script>

<style lang="scss">
.YouTubeIcon {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>