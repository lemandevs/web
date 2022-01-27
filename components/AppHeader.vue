<template>
  <div :class="classes">
    <NuxtLink
      v-for="mathRoute in breadcrumbs"
      :to="mathRoute.path"
      v-slot="{ isExactActive }"
    >
      <Typography size="large" :level="isExactActive ? 'emphatic' : 'primary'">
        {{
          $t(
            `pages.${
              mathRoute.name || mathRoute.path.replace('/', '')
            }.breadcrumbs`
          )
        }}
      </Typography>
    </NuxtLink>
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
  (mathRoute) =>
    route.matched.find(({ path }) => mathRoute.path === path) === mathRoute
)
debugger
</script>

<style lang="scss">
.AppHeader {
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
}
</style>