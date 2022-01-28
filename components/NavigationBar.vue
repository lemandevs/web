<template>
  <div :class="classes">
    <Btn
      class="NavBarItem"
      v-for="route in routes.filter(({ path }) => path)"
      :key="route.name"
      :to="`${parent.path}/${route.path}`"
      direction="column"
      @click="navigate"
      iconAfter
      :icon="route.meta?.icon"
    >
      {{
        $t(
          `components.widgets.AppMenu.routes.${
            route.name || route.path.replace('/', '')
          }.label`
        )
      }}
    </Btn>
    <CssAbsolute v-if="parent" position="top" align="middle" offsetY="-24px">
      <Btn
        :to="parent.path"
        direction="column"
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
const classes = defineClasses('NavBar')
</script>

<style lang="scss">
.NavBar {
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
  .NavBarItem {
    flex: 1;
  }
}
</style>