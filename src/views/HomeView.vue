<template>
  <div class="main">
    <ImageCarousel />
    <div class="text">
      <p class="welcomeText">처음이신가요?</p>
      <a href="/test" class="goActivityButton" @click="initTestAnswer">
        <p>나에게 맞는 운동 찾기</p>
        <img src="@/assets/arrow1.png" class="arrowIcon" />
      </a>
    </div>
  </div>
</template>

<script setup>
import ImageCarousel from "../components/home/ImageCarousel.vue";
import { useTestStore } from "@/stores/Test.js";

const store = useTestStore();

const initTestAnswer = () => {
  store.initAnswer();
};
</script>

<style scoped>
.main {
  padding: 0 10%;
  display: flex;
  margin-top: 60px;
}

.text {
  min-width: 400px;
  margin: 80px 0 0 60px;
}

.welcomeText {
  font-size: 36px;
  font-weight: 600;
}
.arrowIcon {
  width: 20px;
  height: 20px;
  margin-top: 4px;
  margin-left: 10px;
}

.goActivityButton {
  display: flex;
  align-items: center;
  height: 25px;
  font-size: 21px;
  font-weight: 400;
  text-decoration: none;
  color: black;
  margin-top: 30px;
}
</style>
