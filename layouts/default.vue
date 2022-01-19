<template>
  <Layout :variant="variant">
    <slot></slot>
  </Layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data() {
    return {
      variant: 'clear',
    }
  },
}
</script>