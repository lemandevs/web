<template>
  <div :class="classes">
    <AppHeader v-if="variant === 'subrouting'"></AppHeader>
    <slot></slot>
    <CssAbsolute
      position="top"
      align="start"
      :offsetX="16"
      :offsetY="16"
      v-if="variant !== 'clear'"
    >
      <ClientOnly>
        <WidgetsAppMenu position="bottom" align="start" />
      </ClientOnly>
    </CssAbsolute>
    <CssAbsolute
      position="top"
      align="end"
      :offsetX="16"
      :offsetY="16"
      v-if="variant !== 'clear'"
    >
      <ClientOnly>
        <WidgetsAppSettings position="bottom" align="end" />
      </ClientOnly>
    </CssAbsolute>
    <CssAbsolute
      position="bottom"
      align="end"
      :offsetX="16"
      :offsetY="16"
      v-if="variant === 'default'"
    >
      <ClientOnly>
        <WidgetsSocialNetworks position="left" align="middle" />
      </ClientOnly>
    </CssAbsolute>

    <TransitionAppearFrom appear from="bottom">
      <NavigationBar
        v-if="variant === 'subrouting'"
        :routes="parent.children"
        :parent="parent"
      />
    </TransitionAppearFrom>
    <div id="Overlays" />
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    class: true,
    validator(value) {
      return ['default', 'clear', 'subrouting'].includes(value)
    },
  },
})
const classes = defineClasses('Layout')

const router = useRouter()
const route = useRoute()
const parent = router.options.routes.find(({ path }) => {
  return path === route.matched[0].path
})
</script>

<style lang="scss">
.Layout {
  --layout-bg-color: var(--color-background);
  --layout-bg-from-gradient-color: var(--color-background);
  --layout-bg-to-gradient-color: var(--color-surface);
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-background);

  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  .Content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex: 1 1 0%;
  }

  #Overlays {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
    :not(:empty):before {
      content: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  #Overlays > * {
    pointer-events: auto;
  }
}
</style>