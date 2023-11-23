<template>
  <div>
    <a class="activityTitle">액티비티에 관한 다양한 정보</a>
  </div>
  <ul>
    <li v-for="article in articles" :key="articleId">
      <img :src="article.articleThumbnail" />
      <div class="activityCard">
        <a :href="article.articleUrl" target="_blank">{{
          article.articleTitle
        }}</a>
        <br />
        <span>{{ article.articleContent }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import http from "@/util/http-commons.js";

const articles = ref();

onMounted(() => {
  http.get("article").then((res) => {
    articles.value = res.data;
  });
});
</script>

<style scoped>
.activityTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  padding: 40px;
  margin: 20px;
  color: #5e5d5d;
}

.activityCard {
  display: block;
}

li {
  margin: 10px;
  text-align: left;
  display: flex; /* Flexbox를 사용하여 아이템들을 가로로 정렬합니다. */
  align-items: flex-start; /* 아이템들을 세로 상단으로 정렬합니다. */
  padding: 20px;
}

img {
  display: block;
  margin-right: 20px; /* articleThumbnail과 articleTitle 사이의 간격을 조절합니다. */
  width: 270px;
  height: 180px;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 23px;
  padding: 20px;
}

span {
  color: #666;
  margin: 5px 0;
  display: block; /* articleContent가 새로운 줄에서 시작하도록 합니다. */
  padding: 20px;
}
</style>
