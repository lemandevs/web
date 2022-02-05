<template>
  <div
    :class="['Roullette', dragging ? 'Roullette_dragging' : '']"
    ref="wheel"
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
    <div
      class="Techs"
      :style="`transform: rotate(${radToDeg(
        globalOffsetAngle + offsetAngle
      )}deg)`"
    >
      <div
        v-for="(tech, index) in items"
        class="Tech"
        :key="tech.id"
        :style="`transform: rotate(${itemAngle(index)}deg)`"
      >
        <div
          class="Point"
          :style="`transform: rotate(${itemAngle2(index) * -1}deg)`"
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
const classes = defineClasses('Roullette')

const visible = ref(true)

const selected = ref(0)
const offset = ref(0)

const select = (value, index) => {
  selected.value = index
}

const dragging = ref(false)
const startTouch = ref({ x: 0, y: 0 })
const moveTouch = ref({ x: 0, y: 0 })

const wheel = ref()
const radio = ref(300)

const offsetAngle = ref(0)

const TAU = Math.PI * 2

function mod(n, m) {
  return ((n % m) + m) % m
}

function normaliseAngle(angle) {
  return mod(angle, TAU)
}

function radToDeg(rag) {
  return (rag * 360) / TAU
}

function degToRad(deg) {
  return (deg * TAU) / 360
}

const globalOffsetAngle = ref(degToRad(45))

const itemAngle = (index) =>
  (360 / props.items.length) * (index - selected.value)

const itemAngle2 = (index) =>
  (360 / props.items.length) * (index - selected.value) +
  radToDeg(normaliseAngle(offsetAngle.value + globalOffsetAngle.value))

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

watch(wheel, (newRef) => {
  radio.value = wheel.value.getBoundingClientRect().width / 2
})
const startAngle = ref(0)
const touchstart = (event) => {
  startTouch.value = getMouseLocation(event, wheel.value)
  const dx = startTouch.value.x - radio.value
  const dy = startTouch.value.y - radio.value
  startAngle.value = normaliseAngle(Math.atan2(dy, dx))
  dragging.value = true
}
function touchmove(event) {
  if (dragging.value) {
    moveTouch.value = getMouseLocation(event, wheel.value)
    const dx = moveTouch.value.x - radio.value
    const dy = moveTouch.value.y - radio.value
    offsetAngle.value = normaliseAngle(
      normaliseAngle(Math.atan2(dy, dx)) - startAngle.value
    )
  }
}
const touchend = () => {
  dragging.value = false
  globalOffsetAngle.value = normaliseAngle(
    globalOffsetAngle.value + offsetAngle.value
  )
  offsetAngle.value = 0
}

const dotStartStyle = computed(() => ({
  top: `${startTouch.value.y}px`,
  left: `${startTouch.value.x}px`,
}))

const dotMoveStyle = computed(() => {
  return {
    top: `${moveTouch.value.y}px`,
    left: `${moveTouch.value.x}px`,
  }
})

const dotCenterStyle = computed(() => {
  return {
    top: `${radio.value}px`,
    left: `${radio.value}px`,
  }
})
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
.Roullette {
  position: relative;
  color: var(--color-primary);
  padding: 2rem;
  &_dragging {
    .Tech,
    .Point {
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
  .Techs {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 999px;
  }
  .Tech {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: transform 2s ease;
    .Point {
      transition: transform 2s ease;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: all;
    }
  }
}

@media screen and (max-width: 768px) {
  .Roullette {
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