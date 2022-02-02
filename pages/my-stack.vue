<template>
  <div :class="classes">
    <div class="Stack">
      <div class="Avatar">
        <img class="AvatarPhoto" src="/public/img/profile-photo.png" />
      </div>
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
  'JavaScript',
  'CSS',
  'HTML',
  'Vue',
  'Nuxt',
  'JavaScript',
  'CSS',
  'HTML',
  'Vue',
  'Nuxt',
])
</script>

<style lang="scss">
@keyframes moving {
  0% {
    transform: translate3d(0%, 0%, 0) scale(1);
  }
  3% {
    transform: translate3d(-3%, -3%, 0) scale(1.05);
  }
  6% {
    transform: translate3d(0%, 0%, 0) scale(1);
  }
  30% {
    transform: translate3d(3%, -3%, 0) scale(0.95);
  }
  40% {
    transform: translate3d(6%, -6%, 0) scale(1);
  }
  50% {
    transform: translate3d(3%, -3%, 0) scale(0.95);
  }
  60% {
    transform: translate3d(0%, -5%, 0) scale(0.98);
  }
  70% {
    transform: translate3d(3%, -3%, 0) scale(1);
  }
  80% {
    transform: translate3d(6%, -1%, 0) scale(1.1);
  }
  90% {
    transform: translate3d(4%, 0%, 0) scale(1.05);
  }
  100% {
    transform: translate3d(6%, 2%, 0) scale(1);
  }
}
.MyStackPage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Avatar {
  border: 2px solid var(--color-primary);
  border-radius: 99999px;
  overflow: hidden;
  width: 300px;
  height: 300px;
}
.Stack {
  position: relative;
  color: var(--color-primary);
  padding: 32px;
  margin-top: 64px;
  .Icon {
    width: 64px;
    height: 64px;
    animation-name: moving;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-delay: var(--item-delay);
  }
  .Tech {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .Point {
      position: absolute;
      top: 0;
      left: 0;
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
      width: 32px;
      height: 32px;
    }
  }
}
</style>