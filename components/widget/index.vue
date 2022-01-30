<template>
  <CssAbsolute
    :position="position"
    :align="align"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :class="classes"
  >
    <OverlayDropdown
      v-model:visible="localVisible"
      :css="false"
      :width="width"
      :position="dropdownPosition"
      :align="dropdownAlign"
      :mobileFullScreen="mobileFullScreen"
      :offset-y="dropdownOffsetY"
      :offset-x="dropdownOffsetX"
    >
      <template #target="{ toggle }">
        <Btn
          size="large"
          variant="clear"
          level="emphatic"
          rounded
          @click="toggle"
          :icon="icon"
          :active="localVisible"
        />
      </template>
      <template #content>
        <slot></slot>
      </template>
    </OverlayDropdown>
  </CssAbsolute>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    class: true,
  },
  mobileFullScreen: {
    type: Boolean,
    default: false,
    class: true,
  },
  icon: {
    type: String,
    default: 'Menu',
  },
  position: {
    type: String,
    default: 'top',
  },
  align: {
    type: String,
    default: 'start',
  },
  dropdownPosition: {
    type: String,
    default: 'bottom',
  },
  dropdownAlign: {
    type: String,
    default: 'start',
  },
  width: {
    type: String,
    default: 'content',
  },
  offsetX: {
    type: Number,
    default: 0,
  },
  offsetY: {
    type: Number,
    default: 0,
  },
  dropdownOffsetX: {
    type: Number,
    default: 0,
  },
  dropdownOffsetY: {
    type: Number,
    default: 0,
  },
})
const classes = defineClasses('Widget')
const { theme } = useTheme()
const router = useRouter()

const emit = defineEmits(['update:visible'])

const localVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})
</script>

<style lang="scss">
.Widget {
}

@media screen and (min-width: 769px) {
  .Widget_localVisible {
    z-index: 1;
  }
}
</style>