<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    width="small"
    variant="fill"
    class="WidgetAppMenuDropdown"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="24"
  >
    <template #target>
      <Btn
        size="large"
        variant="clear"
        level="emphatic"
        rounded
        @click="visible = !visible"
        icon="Menu"
        :active="visible"
      />
    </template>
    <template #content>
      <div :class="classes">
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
      </div>
    </template>
  </OverlayDropdown>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('WidgetAppMenu')
const { theme } = useTheme()
const router = useRouter()
const visible = ref(false)
</script>

<style lang="scss">
.WidgetAppMenu {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  .item {
    white-space: pre;
  }
}
</style>