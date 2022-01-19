<template>
  <div :class="classes">
    <div v-for="color in colors" :key="color" :class="`Color Color_${color}`" />
  </div>
</template>

<script setup>
const props = defineProps({})
const colors = ref([
  'emphatic',
  'primary',
  'secondary',
  'surface',
  'background',
])
const classes = defineClasses('PalettePage')
</script>

<style lang="scss">
.PalettePage {
  display: flex;
  flex: 1;
  .Color {
    flex: 1;
  }
  .Color_primary {
    background-color: var(--color-primary);
  }
  .Color_secondary {
    background-color: var(--color-secondary);
  }
  .Color_emphatic {
    background-color: var(--color-emphatic);
  }
  .Color_background {
    background-color: var(--color-background);
  }
  .Color_surface {
    background-color: var(--color-surface);
  }
}
</style>