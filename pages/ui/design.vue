<template>
  <div :class="classes">
    {{ DesignPage }}
  </div>
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
const classes = defineClasses('DesignPage')
</script>

<style lang="scss">
.DesignPage {
}
</style>