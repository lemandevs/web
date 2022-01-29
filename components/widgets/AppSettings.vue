<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    width="small"
    variant="fill"
    class="WidgetAppSettingsDropdown"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="24"
  >
    <template #target>
      <Btn
        size="large"
        variant="clear"
        level="emphatic"
        rounded
        @click="visible = !visible"
        icon="Settings"
        :active="visible"
      />
    </template>
    <template #content>
      <EffectPanel :class="classes">
        <FormField
          :label="$t('components.widgets.settings.language.label')"
          type="select"
          name="language"
          v-model:value="$i18n.locale"
          :options="languages"
        />
        <FormField
          :label="$t('components.widgets.settings.darkMode.label')"
          type="switch"
          name="darkMode"
          v-model:value="darkMode"
        />
      </EffectPanel>
    </template>
  </OverlayDropdown>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('WidgetAppSettings')

const { theme } = useTheme()
const visible = ref(false)

const darkMode = computed({
  get() {
    return theme.value === 'dark'
  },
  set(value) {
    theme.value = value ? 'dark' : 'light'
  },
})

const { language, setLanguage, availableLocales } = useI18n()

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
  padding: 3rem 1rem;
  border-radius: 1rem;
  overflow: auto;
}
</style>