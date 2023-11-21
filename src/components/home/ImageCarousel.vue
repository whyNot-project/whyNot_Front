<template>
  <div>
    <v-carousel
      :show-arrows="false"
      hide-delimiters
      cycle
      width="900px"
      minHeight="1200px"
      interval="3000"
      cover
    >
      <v-carousel-item v-for="(src, i) in srcList" :key="i">
        <img :src="src" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
const srcList = ref([
  "/main/mainThumbnail1.jpg",
  "/main/mainThumbnail2.jpg",
  "/main/mainThumbnail3.jpg",
  "/main/mainThumbnail4.jpg",
]);
</script>

<style scoped>
img {
  width: 900px;
}
</style>
