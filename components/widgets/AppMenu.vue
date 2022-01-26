<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    width="small"
    class="WidgetAppMenuDropdown"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="16"
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
  padding: 1rem;
  border-radius: 1rem;

  background: var(--color-surface);

  background: linear-gradient(
    45deg,
    rgba(var(--color-surface-rgb), 0.7),
    var(--color-surface)
  );
  overflow: auto;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  background-clip: padding-box;
  border: solid 2px transparent;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: 0px;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--color-emphatic),
      rgba(var(--color-emphatic-rgb), 0.5)
    );
  }
  .item {
    white-space: pre;
  }
}
</style>