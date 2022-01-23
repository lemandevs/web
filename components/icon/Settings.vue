<template>
  <div :class="classes">
    <span class="SettingsBar" />
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
    &:after {
      content: '';
      position: absolute;
      border: 1px solid currentColor;
      width: 4px;
      height: 4px;
      border-radius: 9999px;
      background: currentColor;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      transition: left 0.3s ease-in-out;
    }

    &:nth-child(1n):after {
      left: 30%;
    }

    &:nth-child(2n):after {
      left: 70%;
    }

    &:nth-child(3n):after {
      left: 50%;
    }
  }
  &_active {
    .SettingsBar:nth-child(1n):after {
      left: 50%;
    }

    .SettingsBar:nth-child(2n):after {
      left: 30%;
    }

    .SettingsBar:nth-child(3n):after {
      left: 70%;
    }
  }
}
</style>