<template>
  <div :class="classes">
    <span class="Title"
      >PROXIMAMENTE
      <span class="Reflect"></span>
      <span class="Light"></span>
      <span class="Reflect"></span>
    </span>
    <a class="GithubLink" href="https://github.com/lemandevs">
      <svg
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        baseProfile="full"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.02751 0.333496C3.34571 0.333496 0.333332 3.40836 0.333332 7.16653C0.333332 10.1845 2.23002 12.7468 4.90769 13.6579C5.2424 13.7149 5.35397 13.4871 5.35397 13.3163C5.35397 13.1454 5.35397 12.7468 5.35397 12.1774C3.51307 12.576 3.12257 11.2664 3.12257 11.2664C2.84365 10.4692 2.39737 10.2414 2.39737 10.2414C1.72795 9.8428 2.39737 9.8428 2.39737 9.8428C3.06679 9.89974 3.4015 10.5261 3.4015 10.5261C4.01513 11.5511 4.96347 11.2664 5.35397 11.0955C5.40975 10.64 5.57711 10.3553 5.80024 10.1845C4.29405 10.0136 2.73208 9.44421 2.73208 6.82488C2.73208 6.08463 3.011 5.45827 3.4015 5.00274C3.4015 4.77497 3.12257 4.09166 3.51307 3.18059C3.51307 3.18059 4.07091 3.00977 5.35397 3.8639C5.91181 3.69307 6.46966 3.63613 7.02751 3.63613C7.58536 3.63613 8.14321 3.69307 8.70105 3.8639C9.98411 2.95283 10.542 3.18059 10.542 3.18059C10.9324 4.14861 10.6535 4.83191 10.5977 5.00274C11.044 5.45827 11.2672 6.08463 11.2672 6.82488C11.2672 9.44421 9.70518 10.0136 8.19899 10.1845C8.42213 10.4122 8.64527 10.8108 8.64527 11.4372C8.64527 12.3482 8.64527 13.0885 8.64527 13.3163C8.64527 13.4871 8.75684 13.7149 9.09155 13.6579C11.7692 12.7468 13.6659 10.1845 13.6659 7.16653C13.7217 3.40836 10.7093 0.333496 7.02751 0.333496Z"
          fill="currentColor"
        ></path>
      </svg>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('ComingSoon')
</script>

<style lang="scss">
@keyframes shine {
  0% {
    background-position: -0% center;
  }
  100% {
    background-position: 100% center;
  }
}
@keyframes light {
  0% {
    left: 100%;
  }
  100% {
    left: -20%;
  }
}
@keyframes reflect {
  0% {
    left: -20%;
  }
  100% {
    left: 100%;
  }
}
.GithubLink {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: color 0.3s ease-in-out;
  width: 2rem;
  color: var(--color-primary);
  &:hover {
    color: var(--color-emphatic);
  }
}

.Title,
.Light {
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: both;
  animation-play-state: running;
}

.ComingSoon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  .Title {
    position: relative;
    font-size: 5em;
    background-color: transparent;
    color: transparent;
    background: linear-gradient(
      to right,
      transparent 30%,
      rgba(var(--color-surface-rgb, 0.1)) 40%,
      var(--color-primary) calc(50% - 50px),
      var(--color-primary) calc(50% + 50px),
      rgba(var(--color-surface-rgb, 0.1)) 60%,
      transparent 70%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation-name: shine;
    .Reflect,
    .Light {
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 100px;
      height: 100px;
      border-radius: 9999px;
      opacity: 0.2;
    }

    .Light {
      background: white;
      animation-name: light;
      box-shadow: 0px 0px 45px 45px white, 0px 0px 100px 100px white,
        inset 0px 0px 45px 45px white;
      opacity: 0.2;
    }
    .Reflect {
      display: none;
      animation-name: light;
      animation-direction: alternate-reverse;
      box-shadow: 0px 0px 2px 2px red, inset 0px 0px 2px 2px red,
        inset 0px 0px 1px 1px red;
      width: 100px;
      height: 100px;
      background: red;
    }
  }
}
</style>