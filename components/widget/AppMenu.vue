<template>
  <Widget
    :offset-x="16"
    :offset-y="16"
    v-model:visible="localVisible"
    :css="false"
    width="small"
    icon="Menu"
    position="top"
    align="start"
    mobileFullScreen
    dropdown-title="Application menu"
    dropdown-position="bottom"
    dropdown-align="start"
    :dropdown-offset-y="24"
  >
    <Menu :class="classes" direction="column">
      <template v-for="route in menuRoutes" :key="route.name">
        <MenuItemLink
          v-if="!route.children || !route.children.length"
          :route="route"
        />
        <template v-else>
          <OverlayDropdown
            v-if="desktop"
            is="MenuItem"
            position="right"
            align="start"
            v-model:visible="submenuVisible"
            mobileFullScreen
            :css="false"
            :overlay="false"
          >
            <template v-slot:target="{ visible, open, close, toggle }">
              <MenuItemLink
                :route="route"
                @mouseenter="debounce(open)"
                @mouseleave="debounce(close)"
                @click.stop="debounce(toggle)"
                :active="visible"
              />
            </template>
            <template v-slot:content="{ open, close }">
              <Menu
                :class="classes"
                direction="column"
                @mouseenter="debounce(open)"
                @mouseleave="debounce(close)"
              >
                <MenuItemLink
                  v-for="subroute in getMenuRoutes(route.children)"
                  :key="subroute.name"
                  :route="{
                    ...subroute,
                    path: `${route.path}/${subroute.path}`,
                  }"
                />
              </Menu>
            </template>
          </OverlayDropdown>
          <template v-else-if="mobile">
            <MenuItemLink
              :route="route"
              :navigable="false"
              childrenIcon="Chevron"
              :active="submenuVisible"
              @click="submenuVisible = !submenuVisible"
            />

            <TransitionCollapse>
              <Menu v-if="submenuVisible" :class="classes" direction="column">
                <MenuItemLink
                  v-for="subroute in getMenuRoutes(route.children)"
                  :key="subroute.name"
                  :route="{
                    ...subroute,
                    path: `${route.path}/${subroute.path}`,
                  }"
                />
              </Menu>
            </TransitionCollapse>
          </template>
        </template>
      </template>
    </Menu>
  </Widget>
</template>

<script setup>
import _ from 'lodash'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const classes = defineClasses('WidgetAppMenu')
const { theme } = useTheme()
const { mobile, desktop } = provideMediaQueries()
const router = useRouter()
const route = useRoute()

watch(route, () => {
  localVisible.value = false
})

const getMenuRoutes = (routes) => {
  return _.sortBy(_.filter(routes, 'meta.menu'), ['meta.menu.position'])
}

const menuRoutes = computed(() => getMenuRoutes(router.options.routes))

watch(route, () => {
  localVisible.value = false
})

const emit = defineEmits(['update:visible'])

const localVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const submenuVisible = ref(false)

const debounce = _.debounce((method) => {
  method()
}, 100)
</script>

<style lang="scss">
.WidgetAppMenu {
  height: 100%;
  overflow: auto;

  .WidgetAppMenu {
    background: rgba(var(--color-primary-rgb), 0.1);
  }
  .AppMenuLink {
    display: flex;
    cursor: pointer;
    padding: 1rem;
    background: transparent;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &_active {
      background: rgba(var(--color-emphatic-rgb), 0.2);
    }
    &:hover {
      background: rgba(var(--color-emphatic-rgb), 0.1);
    }
  }
  &:hover .AppMenuLink {
    background: transparent;
    &:hover {
      background: rgba(var(--color-emphatic-rgb), 0.2);
    }
  }
}
</style>