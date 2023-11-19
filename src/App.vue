<template>
  <div>
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavigationBar from "./components/common/NavigationBar.vue";
</script>

<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
