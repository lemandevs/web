<template>
  <div :class="classes">
    <AppHeader></AppHeader>
    <div class="content"><NuxtNestedPage /></div>
    <div class="NavBar">
      <NuxtLink
        :to="`${uiRoute.path}`"
        v-slot="{ isExactActive, navigate }"
        @click="navigate"
        class="NavBarItem"
      >
        <Typography
          is="span"
          size="medium"
          :level="isExactActive ? 'emphatic' : 'primary'"
          weight="bold"
          class="OverflowText"
        >
          {{
            $t(
              `components.widgets.AppMenu.routes.${
                uiRoute.name || uiRoute.path.replace('/', '')
              }.label`
            )
          }}
        </Typography>
      </NuxtLink>
      <Btn
        class="NavBarItem"
        v-for="subRoute in uiRoute.children.filter(({ path }) => path)"
        :key="subRoute.name"
        :to="`${uiRoute.path}/${subRoute.path}`"
        direction="column"
        @click="navigate"
        iconAfter
        :icon="subRoute.meta?.icon"
      >
        {{
          $t(
            `components.widgets.AppMenu.routes.${
              subRoute.name || subRoute.path.replace('/', '')
            }.label`
          )
        }}
      </Btn>
    </div>
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
definePageMeta({
  layout: 'subrouting',
})
const router = useRouter()
const route = useRoute()
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
}
</style>