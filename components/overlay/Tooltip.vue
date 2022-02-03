<template>
  <OverlayDropdown class="Tooltip">
    <template v-slot:target="{ visible, open, close, toggle }">
      <span
        @mouseenter="desktop && debounce(open)"
        @mouseleave="desktop && debounce(close)"
        @click="toggle"
      >
        <slot name="target" v-bind="{ visible, open, close, toggle }" />
      </span>
    </template>
    <template v-slot:content="{ visible, open, close, toggle }">
      <CssFlexBox
        @mouseenter="desktop && debounce(open)"
        @mouseleave="desktop && debounce(close)"
        direction="column"
        align="stretch"
        gap="1"
      >
        <slot name="content" v-bind="{ visible, open, close, toggle }" />
        <Btn
          v-if="mobile"
          text="OK"
          level="primary"
          variant="fill"
          @click="close"
        />
      </CssFlexBox>
    </template>
  </OverlayDropdown>
</template>

<script setup>
import _ from 'lodash'
const debounce = _.debounce((method) => {
  method()
}, 300)

const props = defineProps({
  prop: {
    type: String,
    default: 'value',
    validator(value) {
      return true
    },
    class: true,
  },
})
const classes = defineClasses('Tooltip')
const { mobile, desktop } = provideMediaQueries()
</script>

<style lang="scss">
.Tooltip {
  .DropdownContent {
    border-radius: 0.5rem !important;
    overflow: hidden;
    padding: 1rem;
    margin-top: 1rem;
  }
  &.Dropdown_middle::after {
    left: 50%;
    transform: translate3d(-50%, -1rem, 0);
  }
  @media screen and (max-width: 769px) {
    .DropdownContent {
      padding: 1.5rem 1rem;
      i {
        display: block;
        padding: 1.5rem 1rem;
      }
    }
  }
  @media screen and (min-width: 769px) {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border-width: 1rem;
      border-color: transparent;
      border-style: solid;
      border-bottom-color: var(--color-surface);
      transform: translateY(-1rem);
    }
  }
}
</style>