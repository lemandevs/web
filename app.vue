<template>
  <Html :class="theme">
    <Head>
      <Title>Leman.dev</Title>
      <Meta name="description" content="Leman developments" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="msapplication-TileColor" content="#ffffff" />
      <Meta
        name="msapplication-TileImage"
        content="icons//ms-icon-144x144.png"
      />
      <Meta name="theme-color" content="#ffffff" />
    </Head>
    <Body>
      <NuxtPage />
    </Body>
  </Html>
</template>

<script setup>
const { theme } = useTheme()
</script>
<style lang="scss">
html.dark {
  color: var(--color-primary);
}
</style>