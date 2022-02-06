<template>
  <div :class="classes">
    <Roulette v-if="stack" :items="stack" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'subrouting',
  key: (route) => route.fullPath,
  menu: {
    position: 2,
  },
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
})
const classes = defineClasses('MyStackPage')
const stack = ref(null)
onMounted(() => {
  fetch('/api/stack')
    .then((response) => response.json())
    .then((response) => {
      stack.value = response
    })
})
</script>

<style lang="scss">
.MyStackPage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}
</style>