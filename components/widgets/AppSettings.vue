<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="16"
  >
    <template #target>
      <Btn
        size="large"
        variant="clear"
        level="primary"
        rounded
        @click="visible = !visible"
        icon="Settings"
        :active="visible"
      />
    </template>
    <template #content>
      <div :class="classes">
        <div class="item">Dark mode</div>
        <div class="item">Language</div>
      </div>
    </template>
  </OverlayDropdown>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('WidgetAppSettings')

const visible = ref(false)

const socialNetworks = await fetch(`/api/social-networks`).then((r) => r.json())
</script>

<style lang="scss">
.WidgetAppSettings {
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 1rem;
  border-radius: 1rem;

  backdrop-filter: blur(50px);
  background: rgba(var(--color-primary-rgb), 0.05);

  overflow: auto;

  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  .item {
    white-space: pre;
  }
}
</style>