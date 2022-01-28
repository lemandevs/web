<template>
  <div :class="classes">
    <template v-for="matchRoute in breadcrumbs" :key="matchRoute.path">
      <NuxtLink :to="matchRoute.path" v-slot="{ isExactActive }">
        <Typography
          size="large"
          :level="isExactActive ? 'emphatic' : 'primary'"
        >
          {{ $t(`pages.${routeName(matchRoute)}.breadcrumbs`) }}
        </Typography>
      </NuxtLink>
      <Typography
        v-if="matchRoute.path !== route.path"
        size="large"
        level="primary"
        class="BreadcrumbSeparator"
      >
        ›
      </Typography>
    </template>
    <slot></slot>
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
const classes = defineClasses('AppHeader')
const route = useRoute()
const breadcrumbs = route.matched.filter(
  (matchRoute) =>
    route.matched.find(({ path }) => matchRoute.path === path) === matchRoute
)
const routeName = (matchRoute) =>
  matchRoute.name || matchRoute.path.replace('/', '')
</script>

<style lang="scss">
.AppHeader {
  position: sticky;
  top: 0;
  left: 0;
  --header-height: 88px;
  display: flex;
  width: 100%;
  padding: 32px 104px;
  align-items: center;
  height: var(--header-height);
  background: var(--color-surface);
  background: repeating-linear-gradient(
    105deg,
    black,
    black calc(var(--header-height) + 8px),
    var(--color-surface) calc(var(--header-height) + 8px),
    var(--color-surface) 100%
  );
  .BreadcrumbSeparator {
    white-space: pre;
  }
}
</style>