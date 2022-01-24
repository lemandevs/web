<template>
  <div :class="classes">
    <span class="SettingsBar" />
    <span class="SettingsBar" />
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('Settings')
</script>

<style lang="scss">
.Settings {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .SettingsBar {
    position: relative;
    flex: 1;
    background: transparent;
    margin: 2px 0;
    border-radius: 9999px;
    border: 1px solid currentColor;
    padding: 1px;
    &:after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 9999px;
      background: currentColor;
      top: 50%;
      transform: translate3d(0%, -50%, 0);
      transition-property: transform, left;
      transition-duration: 0.3s;
      transition-timing-function: ease-in-out;
    }

    &:nth-child(1n):after {
      left: 0%;
    }

    &:nth-child(2n):after {
      left: 100%;
      transform: translate3d(-100%, -50%, 0);
    }
  }
  &_active {
    .SettingsBar:nth-child(1n):after {
      left: 100%;
      transform: translate3d(-100%, -50%, 0);
    }

    .SettingsBar:nth-child(3n):after {
      left: 100%;
      transform: translate3d(-100%, -50%, 0);
    }
  }
}
</style>