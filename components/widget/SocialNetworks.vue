<template>
  <Widget
    :offset-x="16"
    :offset-y="16"
    v-model:visible="localVisible"
    :css="false"
    width="content"
    icon="ChevronX"
    position="bottom"
    align="end"
    dropdown-position="left"
    dropdown-align="middle"
    :dropdown-offset-y="0"
    :dropdown-offset-x="24"
  >
    <div :class="classes">
      <a
        v-for="socialNetwork in socialNetworks"
        :key="socialNetwork.href"
        :href="socialNetwork.href"
        target="_blank"
        class="SocialNetworkLink"
      >
        <Icon size="huge" :name="socialNetwork.icon" />
      </a>
    </div>
  </Widget>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible'])

const localVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const classes = defineClasses('WidgetSocialNetworks')

const socialNetworks = await fetch(`/api/social-networks`).then((r) => r.json())
</script>

<style lang="scss">
@keyframes appear {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.WidgetSocialNetworks {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  padding: 0 1rem;
  .SocialNetworkLink {
    animation-name: appear;
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-fill-mode: both;
    padding: 1rem;
    color: var(--color-primary);
    &:hover {
      color: var(--color-emphatic);
    }
  }
  @for $i from 0 through 10 {
    .SocialNetworkLink:nth-child(#{$i}n) {
      animation-delay: #{$i * 0.25}s;
    }
  }
}
</style>