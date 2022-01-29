<template>
  <component :is="is">
    <slot name="target" :toggle="toggle" :visible="visible">
      <Btn
        variant="clear"
        level="primary"
        @click="toggle"
        icon="Chevron"
        :active="visible"
      />
    </slot>
    <teleport v-if="teleportVisible" to="#Overlays">
      <TransitionAppearFrom
        appear
        from="bottom"
        @leave="leave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div
          v-if="visible"
          ref="content"
          :class="classes"
          :style="styles"
          v-bind="$attrs"
        >
          <CssAbsolute
            class="DropdownCloseBtn"
            position="top"
            align="end"
            :offsetX="8"
            :offsetY="8"
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
          <slot name="content"></slot>
        </div>
      </TransitionAppearFrom>
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
      default: false,
    },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    width: {
      type: String,
      default: 'content',
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
  },
  setup() {
    const classes = defineClasses('Dropdown')
    return { classes }
  },
  data() {
    return {
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
    visible(newValue, oldValue) {
      if (newValue) {
        this.setBoundingClientRect()
        this.teleportVisible = true
      }
    },
  },
  computed: {
    styles() {
      const left = (() => {
        switch (this.position) {
          case 'left':
            return this.coords.left
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
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}`,
      }
    },
  },
  mounted() {
    this.setBoundingClientRect()
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
      this.$emit(this.visible ? 'close' : 'open', event)
    },
    clickOutside(event) {
      if (
        this.visible &&
        !this.$el.contains(event.target) &&
        !this.$refs.content.contains(event.target) &&
        !document.getElementById('Overlays').contains(event.target)
      ) {
        this.$emit('close', event)
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
  overflow: auto;
  --dropdown-translate-y: 0;
  --dropdown-translate-x: 0;
  @media screen and (max-width: 768px) {
    pointer-events: auto;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  @media screen and (min-width: 769px) {
    .DropdownCloseBtn {
      display: none;
    }
    &_small {
      min-width: 220px;
    }

    &_top {
      --dropdown-translate-y: -100%;
    }
    &_center {
      --dropdown-translate-y: -50%;
    }
    &_bottom {
      --dropdown-translate-y: 0%;
    }

    &_top,
    &_bottom,
    &_center {
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

    &_left,
    &_right {
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
    &_left {
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