<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    width="small"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="16"
  >
    <template #target>
      <Btn
        size="large"
        variant="clear"
        level="primary"
        rounded
        @click="visible = !visible"
        icon="Settings"
        :active="visible"
      />
    </template>
    <template #content>
      <div :class="classes">
        <FormField
          label="Language"
          type="select"
          v-model:value="currentLanguage"
          :options="languages"
        />
      </div>
    </template>
  </OverlayDropdown>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('WidgetAppSettings')

const visible = ref(false)

const { language, setLanguage } = i18n()

const currentLanguage = computed({
  get() {
    return language.value
  },
  set(value) {
    setLanguage(value)
  },
})

const languages = await fetch(`/api/languages`)
  .then((r) => r.json())
  .then((languages) =>
    languages.map(({ code: value, label }) => ({ value, label }))
  )
</script>

<style lang="scss">
.WidgetAppSettings {
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 1rem;
  border-radius: 1rem;

  background: var(--color-surface);

  overflow: auto;

  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  .item {
    white-space: pre;
  }
}
</style>