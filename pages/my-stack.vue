<template>
  <div :class="classes">
    <div class="Stack">
      <div class="Avatar">
        <img class="AvatarPhoto" src="/img/profile-photo.png" />
      </div>
      <div class="Techs">
        <div
          v-for="(tech, index) in stack"
          class="Tech"
          :key="tech"
          :style="`transform: rotate(${(360 / stack.length) * index}deg)`"
        >
          <div
            class="Point"
            :style="`transform: rotate(-${(360 / stack.length) * index}deg)`"
          >
            <Icon
              :name="tech"
              :style="`--item-delay: ${
                (10000 / stack.length) *
                ((index + stack.length / 2) % stack.length)
              }ms`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'subrouting',
  key: (route) => route.fullPath,
  menu: {
    position: 2,
  },
  transition: { appear: true, name: 'Appear', duration: 200, mode: 'out-in' },
})
const classes = defineClasses('MyStackPage')
const stack = ref([
  'HTML',
  'CSS',
  'JavaScript',
  'NodeJS',
  'Vue',
  'Nuxt',
  'React',
  'Redux',
  'NextJS',
  'GraphQL',
])
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
.MyStackPage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
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
.Stack {
  position: relative;
  color: var(--color-primary);
  padding: 2rem;
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
  }
  .Tech {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .Point {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: all;
    }
  }
}

@media screen and (max-width: 768px) {
  .MyStackPage {
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
</style>