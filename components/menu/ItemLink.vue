<template>
  <NuxtLink :to="route.path" v-slot="{ isExactActive, navigate, href }" custom>
    <MenuItem v-bind="$attrs">
      <Typography
        :is="navigable ? 'a' : 'div'"
        size="medium"
        :class="[...classes, isExactActive ? 'MenuItemLink_active' : '']"
        :level="isExactActive ? 'emphatic' : 'primary'"
        weight="bold"
        :href="navigable && href"
        @click="(e) => (navigable ? navigate(e) : null)"
      >
        <CssTextOverflow>
          {{
            route.meta.menu.title ||
            $t(`pages.${route.name || route.path.replace('/', '')}.menu.label`)
          }}
        </CssTextOverflow>
        <Icon
          v-if="route.children.length"
          :name="childrenIcon"
          size="small"
          :active="active"
        />
      </Typography>
    </MenuItem>
  </NuxtLink>
</template>

<script>
export default {
  name: 'MenuItemLink',
  inheritAttrs: false,
}
</script>
<script setup>
import _ from 'lodash'
const props = defineProps({
  route: {
    type: Object,
    default: () => ({
      path: '/',
    }),
    required: true,
  },
  active: {
    type: Boolean,
    class: true,
    default: false,
  },
  navigable: {
    type: Boolean,
    default: true,
  },
  childrenIcon: {
    type: String,
    default: 'ChevronX',
  },
})
const classes = defineClasses('MenuItemLink')
</script>

<style lang="scss">
.MenuItemLink {
  display: flex;
  cursor: pointer;
  padding: 1rem;
  background: transparent;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  &_active {
    background: rgba(var(--color-emphatic-rgb), 0.1);
  }
  &:hover {
    background: rgba(var(--color-emphatic-rgb), 0.2);
  }
}
</style>