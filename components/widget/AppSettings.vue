<template>
  <Widget
    :offset-x="16"
    :offset-y="16"
    v-model:visible="localVisible"
    :css="false"
    width="small"
    icon="Settings"
    position="top"
    align="end"
    dropdown-title="Settings"
    dropdown-position="bottom"
    dropdown-align="end"
    mobileFullScreen
    :dropdown-offset-y="24"
  >
    <div class="SettingsMenu">
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
    </div>
  </Widget>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible'])

const localVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})
const classes = defineClasses('WidgetAppSettings')

const { theme } = useTheme()

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
    languages.map(({ code: value, nativeName: label }) => ({ value, label }))
  )
</script>

<style lang="scss">
.SettingsMenu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
@media screen and (min-width: 769px) {
  .Widget_visible {
    z-index: 1;
  }
}
</style>