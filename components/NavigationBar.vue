<template>
  <div :class="classes">
    <CssFlexBox
      justify="center"
      class="NavigationBarItem"
      v-for="route in routes.filter(({ path }) => path)"
      :key="route.name"
    >
      <Btn
        :to="`${parent.path}/${route.path}`"
        @click="navigate"
        rounded
        iconAfter
        :icon="route.meta?.icon"
      />
    </CssFlexBox>
    <CssAbsolute v-if="parent" position="top" align="middle" offsetY="-24px">
      <Btn
        :to="parent.path"
        iconAfter
        icon="Home"
        level="primary"
        variant="fill"
        rounded
      />
    </CssAbsolute>
  </div>
</template>

<script setup>
const props = defineProps({
  routes: {
    type: Array,
    default: () => [],
  },
  parent: {
    type: Object,
  },
})
const classes = defineClasses('NavigationBar')
</script>

<style lang="scss">
.NavigationBar {
  position: fixed;
  bottom: 0;
  background: var(--color-surface);
  width: 100%;
  border-radius: 16px 16px 0 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  .NavigationBarItem {
    flex: 1;
  }
}
</style>