<template>
  <div
    :class="['Roulette', dragging ? 'Roulette_dragging' : '']"
    ref="roulletteElement"
    @mousedown="touchstart"
    @mousemove="touchmove"
    @mouseup="touchend"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="Avatar">
      <img class="AvatarPhoto" src="/img/profile-photo.png" />
    </div>
    <div class="Items" :style="`transform: rotate(${totalOffsetDegrees}deg)`">
      <div
        v-for="(tech, index) in items"
        class="ItemWrapper"
        :key="tech.id"
        :style="`transform: rotate(${itemAngle(index)}deg)`"
      >
        <div
          class="Item"
          :style="`transform: rotate(${itemRotation(index) * -1}deg)`"
        >
          <OverlayTooltip position="bottom" align="middle" :overlay="false">
            <template v-slot:target="{ visible }">
              <Icon
                @click="select(tech, index)"
                :active="visible"
                :name="tech.name"
                :style="`--item-delay: ${
                  (10000 / items.length) *
                  ((index + items.length / 2) % items.length)
                }ms`"
              />
            </template>
            <template v-slot:content>
              <div v-html="tech.description" />
            </template>
          </OverlayTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
const classes = defineClasses('Roulette')

const { radians, normalizeRadians, radiansToDegrees, degreesToRadians } =
  useTrigonometry()

const visible = ref(true)

const selected = ref(0)

const select = (value, index) => {
  selected.value = index
}

const roulletteElement = ref()
const globalOffsetAngle = ref(degreesToRadians(45))
const startAngle = ref(0)
const offsetAngle = ref(0)
const dragging = ref(false)

const totalOffsetDegrees = computed(() =>
  radiansToDegrees(globalOffsetAngle.value + offsetAngle.value)
)
const itemBaseAngle = computed(() => 360 / props.items.length)

const itemAngle = (index) => itemBaseAngle.value * (index - selected.value)

const itemRotation = (index) =>
  itemBaseAngle.value * (index - selected.value) +
  radiansToDegrees(offsetAngle.value + globalOffsetAngle.value)

const getMouseLocation = (event, target) => {
  const rect = target ? target.getBoundingClientRect() : { left: 0, top: 0 }
  if (event.clientX) {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  return {
    x: event.touches[0].clientX - rect.left,
    y: event.touches[0].clientY - rect.top,
  }
}

const touchstart = (event) => {
  const { x, y, width } = getMouseLocation(event, roulletteElement.value)
  const radio = roulletteElement.value.getBoundingClientRect().width / 2
  startAngle.value = radians(x, y, radio)
  dragging.value = true
}

function touchmove(event) {
  if (dragging.value) {
    const { x, y } = getMouseLocation(event, roulletteElement.value)
    const radio = roulletteElement.value.getBoundingClientRect().width / 2
    offsetAngle.value = normalizeRadians(
      radians(x, y, radio) - startAngle.value
    )
  }
}
const touchend = () => {
  dragging.value = false
  globalOffsetAngle.value = normalizeRadians(
    globalOffsetAngle.value + offsetAngle.value
  )
  offsetAngle.value = 0
}
</script>

<style lang="scss">
@keyframes stop {
  to {
    transform: translate3d(0, 0, 0) rotate(0) scale(1);
  }
}
@keyframes moving {
  0% {
    transform: translate3d(0%, 0%, 0) scale(1) rotate(3deg);
  }
  3% {
    transform: translate3d(-3%, -3%, 0) scale(1.05) rotate(4deg);
  }
  6% {
    transform: translate3d(0%, 0%, 0) scale(1) rotate(5deg);
  }
  30% {
    transform: translate3d(3%, -3%, 0) scale(0.95) rotate(-1deg);
  }
  40% {
    transform: translate3d(6%, -6%, 0) scale(1) rotate(-4deg);
  }
  50% {
    transform: translate3d(3%, -3%, 0) scale(0.95) rotate(-1deg);
  }
  60% {
    transform: translate3d(0%, -5%, 0) scale(0.98) rotate(2deg);
  }
  70% {
    transform: translate3d(3%, -3%, 0) scale(1) rotate(4deg);
  }
  80% {
    transform: translate3d(6%, -1%, 0) scale(1.05) rotate(1deg);
  }
  90% {
    transform: translate3d(4%, 0%, 0) scale(1) rotate(-2deg);
  }
  100% {
    transform: translate3d(6%, 2%, 0) scale(0.98) rotate(1deg);
  }
}
.Avatar {
  border-radius: 99999px;
  width: 300px;
  height: 300px;
  border: 0.5rem solid transparent;
  background-clip: padding-box;
  background-color: var(--color-surface);
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -0.5rem;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-emphatic)
    );
  }
}

.AvatarPhoto {
  width: 100%;
  padding-top: 25%;
  transform: translateY(-20%);
  border-radius: 99999px;
  overflow: hidden;
}
.Roulette {
  position: relative;
  color: var(--color-primary);
  padding: 2rem;
  &_dragging {
    .ItemWrapper,
    .Item {
      transition: none !important;
    }
  }
  .Icon {
    width: 4rem;
    height: 4rem;
    animation-name: moving;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-delay: var(--item-delay);
    transition: all 2s ease;
    &:hover {
      animation-name: stop;
    }
  }
  .Items {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 999px;
  }
  .ItemWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: transform 2s ease;
    .Item {
      transition: transform 2s ease;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: all;
    }
  }
}

@media screen and (max-width: 768px) {
  .Roulette {
    .Avatar {
      width: 50vw;
      height: 50vw;
    }
    .AvatarPhoto {
      width: 100%;
    }

    .Icon {
      width: 3rem;
      height: 3rem;
    }
  }
}
.Dot {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: aquamarine;
  z-index: 1111;
  transform: translate3d(-50%, -50%, 0);
}
</style>