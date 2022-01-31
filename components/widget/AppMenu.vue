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
    dropdown-position="bottom"
    dropdown-align="start"
    :dropdown-offset-y="24"
  >
    <Menu :class="classes">
      <template v-for="route in router.options.routes" :key="route.name">
        <li v-if="!route.children || !route.children.length">
          <NuxtLink :to="route.path" v-slot="{ isActive, navigate }">
            <MenuItem
              is="div"
              @click="navigate"
              v-if="!route.children || !route.children.length"
            >
              <Typography
                size="medium"
                :level="isActive ? 'emphatic' : 'primary'"
                weight="bold"
                class="OverflowText"
              >
                {{
                  $t(
                    `components.widgets.AppMenu.routes.${
                      route.name || route.path.replace('/', '')
                    }.label`
                  )
                }}
              </Typography>
            </MenuItem>
          </NuxtLink>
        </li>
        <OverlayDropdown
          v-else
          is="li"
          position="right"
          align="start"
          v-model:visible="submenuVisible"
          mobileFullScreen
          :css="false"
          :overlay="false"
        >
          <template v-slot:target="{ visible, open, close, toggle }">
            <NuxtLink
              :to="route.path"
              custom
              v-slot="{ isActive }"
              @click="() => null"
            >
              <MenuItem
                is="a"
                @click.stop="debounce(toggle)"
                @mouseenter="debounce(open)"
                @mouseleave="debounce(close)"
              >
                <Typography
                  size="medium"
                  :level="isActive ? 'emphatic' : 'primary'"
                  weight="bold"
                  class="OverflowText"
                >
                  {{
                    $t(
                      `components.widgets.AppMenu.routes.${
                        route.name || route.path.replace('/', '')
                      }.label`
                    )
                  }}
                </Typography>
              </MenuItem>
            </NuxtLink>
          </template>
          <template v-slot:content="{ open, close, toggle }">
            <Menu
              :class="classes"
              @mouseenter="debounce(open)"
              @mouseleave="debounce(close)"
            >
              <li>
                <NuxtLink
                  v-for="subroute in route.children"
                  :key="subroute.name"
                  :to="`${route.path}/${subroute.path}`"
                  v-slot="{ isExactActive, navigate }"
                >
                  <MenuItem is="div" @click="navigate">
                    <Typography
                      size="medium"
                      :level="isExactActive ? 'emphatic' : 'primary'"
                      weight="bold"
                      class="OverflowText"
                    >
                      {{
                        $t(
                          `components.widgets.AppMenu.routes.${
                            subroute.name || subroute.path.replace('/', '')
                          }.label`
                        )
                      }}
                    </Typography>
                  </MenuItem>
                </NuxtLink>
              </li>
            </Menu>
          </template>
        </OverlayDropdown>
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
const router = useRouter()

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
}, 300)
</script>

<style lang="scss">
.WidgetAppMenu {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

@media screen and (min-width: 769px) {
  .Widget_visible {
    z-index: 1;
  }
}
</style>