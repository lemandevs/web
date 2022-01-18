<template>
  <Layout :variant="variant"
    ><button @click="variant = variant === 'default' ? 'clear' : 'default'">
      variant</button
    ><slot></slot
  ></Layout>
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