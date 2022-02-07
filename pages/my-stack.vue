<template>
  <div :class="classes">
    <Roulette v-if="stack" :items="stack" v-model:selected="selected" />
    <div class="Description" v-if="stack">
      <TransitionAppearFrom>
        <p :key="selected" v-html="stack[selected].description" />
      </TransitionAppearFrom>
    </div>
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

const selectedIndex = ref(2)

const selected = computed({
  get: () => {
    return selectedIndex.value
  },
  set: (value) => {
    selectedIndex.value = value
  },
})
</script>

<style lang="scss">
.MyStackPage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem 1rem;
  .Description {
    position: relative;
    width: 100%;
  }
  .Description p {
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
}
</style>