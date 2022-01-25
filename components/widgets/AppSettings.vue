<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    width="small"
    class="WidgetAppSettingsDropdown"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
    :offsetY="16"
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
      <div :class="classes">
        <div>
          <FormField
            :label="$t('components.widgets.settings.language.label')"
            type="select"
            size="small"
            v-model:value="currentLanguage"
            :options="languages"
          />
          <FormField
            :label="$t('components.widgets.settings.darkMode.label')"
            type="switch"
            size="medium"
            v-model:value="darkMode"
          />
        </div>
      </div>
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
  background-clip: padding-box;
  border: solid 2px transparent;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: 0px;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-emphatic)
    );
  }
  .item {
    white-space: pre;
  }
}
</style>