<template>
  <div class="main">
    <div class="videoList">
      <template v-for="video in videoList" :key="video.url">
        <div class="videoCard">
          <a :href="video.url">
            <v-hover v-slot="{ isHovering, props }">
              <v-card class="mx-auto" max-width="344" v-bind="props">
                <v-img :src="video.thumbnail"></v-img>

                <v-card-text>
                  <h2>
                    {{ truncateTitle(video.title) }}
                  </h2>
                  {{ video.author }}
                </v-card-text>

                <v-overlay
                  :model-value="isHovering"
                  contained
                  scrim="#E0E0E0"
                  class="align-center justify-center"
                >
                  <v-btn variant="flat">자세히 보기</v-btn>
                </v-overlay>
              </v-card>
            </v-hover>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import http from "@/util/http-commons.js";

const userId = localStorage.getItem("userId");
const videoList = ref([]);

onMounted(() => {
  http.get(`user/${userId}`).then((res) => {
    console.log(res.data);
    axios
      .get(
        "https://dapi.kakao.com/v2/search/vclip?query=" +
          getKeyword(res.data[0].type) +
          "&sort=accuracy&size=12",
        {
          headers: {
            Authorization: "KakaoAK " + "14dc0676c9b73e856d1d8ee9485c1699",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("요청 성공!");
        console.log(res.data.documents);
        videoList.value = res.data.documents;
      });
  });
});
const truncateTitle = (title) => {
  const maxLength = 18; // 원하는 최대 길이로 수정
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

const getKeyword = (type) => {
  switch (type) {
    case 1:
      return "야외 맨몸운동 유산소";
    case 2:
      return "야외 맨몸운동 유산소";
    case 3:
      return "야외 기구 유산소";
    case 4:
      return "야외 기구 유산소";
    case 5:
      return "야외 맨몸운동 무산소";
    case 6:
      return "야외 맨몸운동 무산소";
    case 7:
      return "야외 기구 무산소";
    case 8:
      return "야외 기구 무산소";
    case 9:
      return "실내 맨몸운동 유산소";
    case 10:
      return "실내 맨몸운동 유산소";
    case 11:
      return "실내 기구 유산소";
    case 12:
      return "실내 기구 유산소";
    case 13:
      return "실내 맨몸운동 무산소";
    case 14:
      return "실내 맨몸운동 무산소 ";
    case 15:
      return "실내 기구 무산소";
    case 16:
      return "실내 기구 무산소";
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
h2 {
  font-size: 15px;
}

.main {
  width: 100%;
}
.videoList {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 0 auto;
  justify-content: center;
}

.videoCard {
  width: 250px;
}

.text-h6 .text-primary {
  font-size: 16px !important;
  font-weight: 400px;
  color: black;
}
</style>
