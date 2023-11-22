<template>
  <div class="main">
    <h2>
      <div :style="{ color: textColor }" class="colorName">{{ color }}</div>
      색의 불꽃을 가진
      <div :style="{ color: textColor }" class="colorName">{{ nickname }}</div>
      님을 위한 맞춤 컨텐츠 추천
    </h2>
    <ActivityViedo />
  </div>
</template>

<script setup>
import http from "@/util/http-commons.js";
import { ref, onMounted, computed } from "vue";
import ActivityViedo from "@/components/activity/ActivityVideo.vue";
const color = ref("");
const nickname = ref(localStorage.getItem("nickname"));
const userId = localStorage.getItem("userId");
onMounted(() => {
  http.get(`user/${userId}`).then((res) => {
    color.value = getColor(res.data[0].type);
  });
});

const getColor = (type) => {
  switch (type) {
    case 1:
      return "네이비 피오니";
    case 2:
      return "다우니";
    case 3:
      return "댄덜라이언";
    case 4:
      return "로즈버드";
    case 5:
      return "바닐라 아이스";
    case 6:
      return "세룰리안";
    case 7:
      return "스위트 핑크";
    case 8:
      return "스프라우트";
    case 9:
      return "앨리스 블루";
    case 10:
      return "오션딥스";
    case 11:
      return "오션베이";
    case 12:
      return "오아시스";
    case 13:
      return "웜플레임";
    case 14:
      return "캑터스";
    case 15:
      return "퀄트스";
    case 16:
      return "페리글라스 블루";
  }
};

const textColor = computed(() => {
  switch (color.value) {
    case "네이비 피오니":
      return "#223A5D";
    case "다우니":
      return "#82B8AD";
    case "댄덜라이언":
      return "#FFD966";
    case "로즈버드":
      return "#D9927A";
    case "바닐라 아이스":
      return "#E6D0CF";
    case "세룰리안":
      return "#9AB7D4";
    case "스위트 핑크":
      return "#F1A4AB";
    case "스프라우트":
      return "#BCC9A6";
    case "앨리스 블루":
      return "#EAEFF9";
    case "오션딥스":
      return "#4D6878";
    case "오션베이":
      return "#648181";
    case "오아시스":
      return "#F2DCB3";
    case "웜플레임":
      return "#B6634A";
    case "캑터스":
      return "#5A6C55";
    case "퀄트스":
      return "#D7D4E9";
    case "페리글라스 블루":
      return "#AEB1B0";
  }
});
</script>

<style scoped>
.main {
  padding: 30px 40px;
}
.colorName {
  display: inline-block;
}

h2 {
  text-align: center;
  margin-bottom: 50px;
}
</style>
