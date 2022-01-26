<template>
  <div :class="classes">
    <div class="header">
      <Typography size="large">UI</Typography>
    </div>
    <div class="menu">
      <NuxtLink
        v-for="subRoute in uiRoute.children"
        :key="subRoute.name"
        :to="`${uiRoute.path}/${subRoute.path}`"
        v-slot="{ isExactActive, navigate }"
      >
        <MenuItem @click="navigate">
          <Typography
            size="medium"
            :level="isExactActive ? 'emphatic' : 'primary'"
            weight="bold"
            class="OverflowText"
          >
            {{
              $t(
                `components.widgets.AppMenu.routes.${
                  subRoute.name || subRoute.path.replace('/', '')
                }.label`
              )
            }}
          </Typography>
        </MenuItem>
      </NuxtLink>
    </div>
    <div class="content"><NuxtNestedPage /></div>
  </div>
</template>

<script setup>
const props = defineProps({
  prop: {
    type: String,
    default: 'value',
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('UIPage')
const router = useRouter()
const uiRoute = router.options.routes.find(({ path }) => path === '/ui')
</script>

<style lang="scss">
.UIPage {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .header {
    display: flex;
    width: 100%;
    padding: 32px 104px;
    align-items: center;
    height: 88px;
    background: var(--color-surface);
  }
  .content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
  }
  .menu {
    display: flex;
  }
}
</style>