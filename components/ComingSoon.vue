<template>
  <div :class="classes">
    <EffectText>LEMAN.DEV</EffectText>
    <div>{{}}</div>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComingSoon')
</script>

<style lang="scss">
.ComingSoon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;
  flex-grow: 1;
}
</style>