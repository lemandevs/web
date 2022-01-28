<template>
  <div :class="classes">
    <div
      v-for="color in colors"
      :key="color.name"
      :class="`Color Color_${color.name}`"
    >
      <span>{{ color.name }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({})

const classes = defineClasses('PalettePage')

definePageMeta({
  icon: 'Palette',
})

const colors = ref([
  {
    name: 'emphatic',
    description: '',
    uses: '',
  },
  {
    name: 'primary',
    description: '',
    uses: '',
  },
  {
    name: 'secondary',
    description: '',
    uses: '',
  },
  {
    name: 'surface',
    description: '',
    uses: '',
  },
  {
    name: 'background',
    description: '',
    uses: '',
  },
])
</script>

<style lang="scss">
.PalettePage {
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  .Color {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > * {
      opacity: 0;
    }
    &:hover > * {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  .Color_primary {
    color: var(--color-on-primary);
    background-color: var(--color-primary);
  }
  .Color_secondary {
    color: var(--color-on-secondary);
    background-color: var(--color-secondary);
  }
  .Color_emphatic {
    color: var(--color-on-emphatic);
    background-color: var(--color-emphatic);
  }
  .Color_background {
    color: var(--color-on-background);
    background-color: var(--color-background);
  }
  .Color_surface {
    color: var(--color-on-surface);
    background-color: var(--color-surface);
  }
}
</style>