<template>
  <div>
    <h2>CrewView</h2>
    <RouterLink :to="{ name: 'AllCrewList' }">전체크루</RouterLink> |
    <RouterLink :to="{ name: 'MyCrewList', params: { } }">내크루</RouterLink> |
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-btn @click="$router.push('/registCrew')" elevation="4" size="small"
            >크루만들기</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <hr />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
a {
  text-decoration: none;
  color: grey;
  font-size: 20px;
  padding: 20px;
}
.router-link-exact-active {
  color: black; /* 활성화된 링크의 텍스트 색상: 검정색 */
}
div {
  display: inline;
  padding: 10px;
}
</style>
