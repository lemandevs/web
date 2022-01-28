<template>
  <div :class="classes">
    <AppHeader></AppHeader>
    <div class="content"><NuxtNestedPage /></div>
    <NavigationBar :routes="parent.children" :parent="parent" />
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
const parent = router.options.routes.find(({ path }) => {
  return path === route.matched[0].path
})
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