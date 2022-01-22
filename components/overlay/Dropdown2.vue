<template>
  <div>
    <slot name="target" :toggle="toggle" :visible="visible">
      <Btn
        variant="clear"
        level="primary"
        @click="toggle"
        icon="Chevron"
        :active="visible"
      />
    </slot>
    <teleport v-if="!closed" to="#Overlays">
      <div ref="content" :class="classes" :style="styles">
        <TransitionAppear
          appear
          @enter="onOpening"
          @after-enter="onOpened"
          @leave="onClosing"
          @after-leave="onClosed"
        >
          <template v-if="opened">
            <slot name="content" :opened="opened"></slot>
          </template>
        </TransitionAppear>
      </div>
    </teleport>
  </div>
</template>

<script>
const Width = {
  small: 128,
  medium: 256,
  large: 512,
}
export default {
  name: 'Dropdown',
  props: {
    position: {
      type: String,
      class: true,
      default: 'center',
      validator(value) {
        return (
          ['top', 'bottom', 'left', 'right', 'center'].includes(value) ||
          !isNaN(value)
        )
      },
    },
    align: {
      type: String,
      class: true,
      default: 'middle',
      validator(value) {
        return ['start', 'middle', 'end'].includes(value) || !isNaN(value)
      },
    },
    width: {
      default: 'content',
      class: true,
      validator(value) {
        return (
          ['small', 'medium', 'large', 'target', 'content'].includes(value) ||
          !isNaN(value)
        )
      },
    },
    visible: { type: Boolean, default: undefined },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
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
      localVisible: false,
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
        this.opened = this.visible
        this.closed = !this.visible
      } else {
        this.opened = false
      }
    },
  },
  computed: {
    isSelfControlled() {
      return typeof this.visible !== 'boolean'
    },
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
    this.localVisible = this.visible
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
      this.localVisible = false
    },
    clickOutside(event) {
      if (
        this.opened &&
        !this.$el.contains(event.target) &&
        !this.$refs.content.contains(event.target)
      ) {
        this.opened = false
      }
    },
    onOpening() {
      this.opened = true
      console.log('onOpening')
      this.$emit('opening')
    },
    onOpened() {
      console.log('onOpened')
      this.$emit('opened')
    },
    onClosing() {
      console.log('onClosing')
      this.$emit('closing')
    },
    onClosed() {
      console.log('onClosed')
      this.closed = true
      this.$emit('closed')
    },
  },
}
</script>

<style lang="scss">
.Dropdown {
  position: absolute;
  width: auto;
  overflow: auto;

  --translate-y: 0;
  --translate-x: 0;

  &_top {
    --translate-y: -100%;
  }
  &_center {
    --translate-y: -50%;
  }
  &_bottom {
    --translate-y: 0%;
  }

  &_top,
  &_bottom,
  &_center {
    &.Dropdown_start {
      --translate-x: 0;
    }
    &.Dropdown_middle {
      --translate-x: -50%;
    }
    &.Dropdown_end {
      --translate-x: -100%;
    }
  }

  &_left,
  &_right {
    &.Dropdown_start {
      --translate-y: 0;
    }
    &.Dropdown_middle {
      --translate-y: -50%;
    }
    &.Dropdown_end {
      --translate-y: -100%;
    }
  }
  &_left {
    --translate-x: -100%;
  }
  transform: translate3d(var(--translate-x), var(--translate-y), 0);
}
</style>