<template>
  <div :class="classes">
    <div
      :class="['Content', menu || settings || social ? 'Content_overlay' : '']"
    >
      <slot></slot>
    </div>
    <div id="Overlays" />
    <AppHeader v-if="variant === 'subrouting'"></AppHeader>

    <ClientOnly>
      <WidgetAppMenu v-if="variant !== 'clear'" v-model:visible="menuVisible" />
      <WidgetAppSettings
        v-if="variant !== 'clear'"
        v-model:visible="settingsVisible"
      />
      <WidgetSocialNetworks
        v-if="variant !== 'clear'"
        v-model:visible="socialVisible"
      />
    </ClientOnly>

    <TransitionAppearFrom appear from="bottom">
      <NavigationBar
        v-if="variant === 'subrouting'"
        :routes="children"
        :parent="parent"
      />
    </TransitionAppearFrom>
  </div>
</template>

<script setup>
import _ from 'lodash'
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
const settings = ref(false)
const social = ref(false)
const menu = ref(false)
const parent = router.options.routes.find(({ path }) => {
  return path === route.matched[0].path
})
const children = _.sortBy(parent.children, ['meta.navBar.position'])
const settingsVisible = computed({
  get() {
    return settings.value
  },
  set(value) {
    settings.value = value
  },
})
const menuVisible = computed({
  get() {
    return menu.value
  },
  set(value) {
    menu.value = value
  },
})
const socialVisible = computed({
  get() {
    return social.value
  },
  set(value) {
    social.value = value
  },
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
  .AppHeader {
    order: 0;
  }
  .Content {
    order: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex: 1 1 0%;
    transition: transform 0.2s ease;
    transform: scale(1);
    &_overlay {
      transform: scale(0.98);
    }
  }

  #Overlays {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    z-index: 1;

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