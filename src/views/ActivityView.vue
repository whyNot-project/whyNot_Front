<template>
    <div>
      <h2>액티비티뷰</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>번호</th>          
          <th>썸네일</th>
          <th>제목</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="articleId">
          <td>{{ article.articleId }}</td>
          <td>{{ article.articleThumbnail }}</td>
          <td>{{ article.articleTitle }}</td>
          <td>{{ article.articleContent }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { computed, onBeforeMount } from 'vue';
  import { useArticleStore } from '@/stores/Article';

  const articleStore = useArticleStore();

  let articles = computed(()=> articleStore.articleList);

  onBeforeMount(() => {
    articleStore.getArticleList();
  })

  </script>
  
  <style scoped>
  
  </style>