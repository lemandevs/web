<template>
  <OverlayDropdown
    :visible="visible"
    :css="false"
    @close="visible = false"
    @open="visible = true"
    @leave-cancelled="leaveCancelled"
  >
    <template #target>
      <Btn
        size="large"
        variant="clear"
        level="emphatic"
        rounded
        @click="visible = !visible"
        icon="ChevronX"
        :active="visible"
      />
    </template>
    <template #content>
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
    </template>
  </OverlayDropdown>
</template>

<script setup>
const props = defineProps({})
const classes = defineClasses('WidgetSocialNetworks')

const visible = ref(false)

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