<template>
  <svg
    :class="classes"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    baseProfile="full"
    viewBox="0 0 330 330"
  >
    <g>
      <path
        d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165c24.814,0,45-20.187,45-45s-20.186-45-45-45
		c-8.271,0-15-6.729-15-15s6.729-15,15-15h146.996c7.134,0,13.28-5.024,14.7-12.015C328.889,187.19,330,176.093,330,165
		C330,74.019,255.981,0,165,0z M299.174,180H165c-24.813,0-45,20.187-45,45s20.187,45,45,45c8.271,0,15,6.729,15,15s-6.729,15-15,15
		c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135C300,170.015,299.724,175.029,299.174,180z"
      />
      <circle id="XMLID_222_" cx="226.413" cy="103.588" r="22.5" />
      <circle id="XMLID_223_" cx="165.002" cy="78.15" r="22.5" />
      <circle id="XMLID_224_" cx="103.589" cy="103.587" r="22.5" />
    </g>
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
const classes = defineClasses('PaletteIcon')
</script>

<style lang="scss">
.PaletteIcon {
  width: 100%;
  height: 100%;
  display: flex;
  fill: currentColor;
}
</style>