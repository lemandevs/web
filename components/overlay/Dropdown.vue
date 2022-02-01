<template>
  <component :is="is">
    <slot
      name="target"
      :toggle="toggle"
      :visible="isVisible"
      :open="open"
      :close="close"
    >
      <Btn
        variant="clear"
        level="primary"
        @click="toggle"
        icon="Chevron"
        :active="isVisible"
      />
    </slot>
    <teleport v-if="teleportVisible" to="#Overlays">
      <TransitionAppear appear v-if="overlay">
        <Overlay v-if="isVisible" ref="overlay" @click="isVisible = false" />
      </TransitionAppear>
      <TransitionAppear
        appear
        @leave="leave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div
          v-if="isVisible"
          :class="classes"
          :style="styles"
          ref="content"
          v-bind="$attrs"
        >
          <EffectPanel class="DropdownContent">
            <header class="DropdownHeader">
              <Typography v-if="title" size="medium" weight="bold">
                {{ title }}
              </Typography>
              <CssAbsolute
                class="DropdownCloseBtn"
                position="top"
                align="end"
                :offset-x="8"
                :offset-y="8"
                :z-index="1"
              >
                <Btn
                  icon="Cross"
                  variant="clear"
                  level="secondary"
                  size="small"
                  @click="toggle"
                  rounded
                />
              </CssAbsolute>
            </header>
            <div class="DropdownContentWrapper">
              <slot
                name="content"
                :toggle="toggle"
                :visible="isVisible"
                :open="open"
                :close="close"
              ></slot>
            </div>
          </EffectPanel>
        </div>
      </TransitionAppear>
    </teleport>
  </component>
</template>

<script>
const Width = {
  small: 128,
  medium: 256,
  large: 512,
}
export default {
  name: 'Dropdown',
  inheritAttrs: false,
  props: {
    is: {
      type: String,
      default: 'div',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    inset: {
      type: Boolean,
      class: true,
      default: false,
    },
    position: {
      type: String,
      class: true,
      default: 'bottom',
      validator(value) {
        return ['top', 'bottom', 'left', 'right', 'center'].includes(value)
      },
    },
    align: {
      type: String,
      class: true,
      default: 'end',
      validator(value) {
        return ['start', 'middle', 'end'].includes(value)
      },
    },
    visible: {
      type: Boolean,
    },
    mobileFullScreen: {
      type: Boolean,
      default: false,
      class: true,
    },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    width: {
      type: String,
      default: 'small',
      class: true,
      validator(value) {
        return (
          ['small', 'medium', 'large', 'target', 'content'].includes(value) ||
          !isNaN(value)
        )
      },
    },
    height: {
      default: 'medium',
      validator(value) {
        return (
          ['small', 'medium', 'large', 'target', 'content'].includes(value) ||
          !isNaN(value)
        )
      },
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const classes = defineClasses('Dropdown')
    return { classes }
  },
  data() {
    return {
      localVisible: false,
      teleportVisible: false,
      window: {
        width: 0,
        height: 0,
      },
      coords: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
    }
  },
  watch: {
    isVisible(newValue, oldValue) {
      if (newValue) {
        this.setBoundingClientRect()
        this.teleportVisible = true
      }
    },
  },
  computed: {
    isVisible: {
      get() {
        if (typeof this.visible === 'boolean') {
          return this.visible
        }
        return this.localVisible
      },
      set(value) {
        this.localVisible = value
        this.$emit('update:visible', value)
      },
    },
    styles() {
      const left = (() => {
        switch (this.position) {
          case 'left':
            return this.coords.left - this.offsetX
          case 'right':
            return this.coords.left + this.coords.width + this.offsetX
          case 'top':
          case 'bottom':
          case 'center':
          default:
            switch (this.align) {
              case 'start':
                return this.coords.left - this.offsetX
              case 'end':
                return this.coords.left + this.coords.width + this.offsetX
              case 'middle':
              default:
                return this.coords.left + this.coords.width / 2 + this.offsetX
            }
        }
      })()
      const top = (() => {
        switch (this.position) {
          case 'top':
            return this.coords.top - this.offsetX
          case 'bottom':
            return this.coords.top + this.coords.height + this.offsetY
          case 'center':
            return this.coords.top + this.coords.height / 2 + this.offsetY
          default:
            switch (this.align) {
              case 'start':
                return this.coords.top + this.offsetY
              case 'end':
                return this.coords.top + this.coords.height + this.offsetY
              case 'middle':
              default:
                return this.coords.top + this.coords.height / 2 + this.offsetY
            }
        }
      })()
      const bottom = (() => {
        switch (this.position) {
          case 'top':
            return this.coords.top - this.offsetX
          case 'bottom':
            return this.coords.top + this.coords.height + this.offsetY
          case 'center':
            return this.coords.top + this.coords.height / 2 + this.offsetY
          default:
            switch (this.align) {
              case 'start':
                return this.coords.top + this.offsetY
              case 'end':
                return this.coords.top + this.coords.height + this.offsetY
              case 'middle':
              default:
                return this.coords.top + this.coords.height / 2 + this.offsetY
            }
        }
      })()

      const width = Width[this.width]
        ? Width[this.width]
        : (() => {
            switch (this.width) {
              case 'target':
                return `${this.coords.width}px`
              case 'content':
              default:
                return 'auto'
            }
          })()
      if (this.scrollable) {
        return {
          padding: `${top}px 0 ${bottom}px 0`,
          top: `${0}px`,
          left: `${left}px`,
          width: `${width}`,
          height: `100vh`,
          maxHeight: 'none',
        }
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}`,
      }
    },
  },
  mounted() {
    if (this.visible) {
      this.setBoundingClientRect()
    }
    window.addEventListener('resize', this.setBoundingClientRect)
    window.addEventListener('scroll', this.setBoundingClientRect)
    document.addEventListener('click', this.clickOutside, true)
    document.addEventListener('touchstart', this.clickOutside, true)
  },
  unmounted() {
    window.removeEventListener('resize', this.setBoundingClientRect)
    window.removeEventListener('scroll', this.setBoundingClientRect)
    document.removeEventListener('click', this.clickOutside, true)
    document.removeEventListener('touchstart', this.clickOutside, true)
  },

  methods: {
    setBoundingClientRect() {
      if (process.client) {
        this.window = {
          width: window.innerWidth,
          height: window.innerHeight,
        }
        this.coords = this.$el.getBoundingClientRect()
      }
    },
    toggle(event) {
      this.isVisible = !this.isVisible
    },
    open(event) {
      this.isVisible = true
    },
    close(event) {
      this.isVisible = false
    },
    clickOutside(event) {
      if (
        this.isVisible &&
        !this.$el.contains(event.target) &&
        !this.$refs.content.contains(event.target) &&
        !document.getElementById('Overlays').contains(event.target)
      ) {
        this.isVisible = false
      }
    },
    leave() {
      this.teleportVisible = false
    },
    enter() {
      this.$emit('opening')
    },
    afterEnter() {
      this.$emit('opened')
    },
  },
}
</script>

<style lang="scss">
.Dropdown {
  position: absolute;
  width: auto;
  --dropdown-translate-y: 0;
  --dropdown-translate-x: 0;
  max-height: 50vh;
  display: flex;
  overflow: hidden;
  .DropdownHeader {
    display: none;
    position: sticky;
    top: 0;
    padding: 1rem;
  }
  .DropdownCloseBtn {
    display: none;
    position: fixed;
    z-index: 1;
  }
  .DropdownContent {
    display: flex;
    flex-direction: column;
  }
  .DropdownContentWrapper {
    flex: 1;
    overflow: auto;
  }
  @media screen and (max-width: 768px) {
    &_mobileFullScreen {
      pointer-events: auto;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      opacity: 1 !important;
      min-height: 100vh;
      .DropdownHeader {
        display: flex;
      }
      .DropdownCloseBtn {
        display: block;
      }
      .DropdownContent {
        min-height: 100vh;
      }
    }
  }
  @media screen and (min-width: 768px) {
    &.Dropdown_small {
      min-width: 220px;
    }

    &.Dropdown_top {
      --dropdown-translate-y: -100%;
      &.Dropdown_inset {
        --dropdown-translate-y: 0;
      }
    }
    &.Dropdown_center {
      --dropdown-translate-y: -50%;
    }
    &.Dropdown_bottom {
      --dropdown-translate-y: 0%;
    }

    &.Dropdown_top,
    &.Dropdown_bottom,
    &.Dropdown_center {
      &.Dropdown_start {
        --dropdown-translate-x: 0;
      }
      &.Dropdown_middle {
        --dropdown-translate-x: -50%;
      }
      &.Dropdown_end {
        --dropdown-translate-x: -100%;
      }
    }

    &.Dropdown_left,
    &.Dropdown_right {
      &.Dropdown_start {
        --dropdown-translate-y: 0;
      }
      &.Dropdown_middle {
        --dropdown-translate-y: -50%;
      }
      &.Dropdown_end {
        --dropdown-translate-y: -100%;
      }
    }
    &.Dropdown_left {
      --dropdown-translate-x: -100%;
    }
    transform: translate3d(
      var(--dropdown-translate-x),
      var(--dropdown-translate-y),
      0
    );
  }
}
</style>