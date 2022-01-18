<template>
  <div class="SocialRoulette">
    <div v-for="n in 10" :key="n" class="">{{ n }}</div>
  </div>
</template>

<style>
.SocialRoulette {
  width: 300px;
  height: 300px;
}
</style>