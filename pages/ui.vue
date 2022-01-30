<template>
  <div :class="classes">
    <NuxtNestedPage />
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
  pageTransition: 'TransitionAppear',
  menu: {
    position: 2,
  },
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
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>