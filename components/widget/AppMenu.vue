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
    dropdown-position="bottom"
    dropdown-align="start"
    :dropdown-offset-y="24"
  >
    <EffectPanel>
      <Menu :class="classes">
        <NuxtLink
          v-for="route in router.options.routes"
          :key="route.name"
          :to="route.path"
          v-slot="{ isActive, navigate }"
        >
          <MenuItem @click="navigate">
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
      </Menu>
    </EffectPanel>
  </Widget>
</template>

<script setup>
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