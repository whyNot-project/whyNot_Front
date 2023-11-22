<template>
  <nav>
    <div class="nav-container">
      <div class="nav-left">
        <RouterLink class="navItem" :to="{ name: 'AllCrewList' }">전체크루</RouterLink> |
        <RouterLink class="navItem" :to="{ name: 'MyCrewList' }">내크루</RouterLink> |
      </div>
      <div class="nav-right">
        <v-btn @click="$router.push('/registCrew')" class="mt-2">크루만들기</v-btn>
      </div>
    </div>
    <hr class="nav-divider" />
    <RouterView />
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  width: 80%; /* 전체 크기 중 80%만 사용하도록 설정 */
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.navItem {
  font-size: 19px;
  text-decoration: none;
  color: grey;
  font-weight: 600;
  padding: 0 10px;
}

.navItem:hover {
  color: black;
}

.router-link-exact-active {
  color: black; /* 활성화된 링크의 텍스트 색상: 검정색 */
}

.nav-divider {
  width: 80%; /* 전체 크기 중 80%만 사용하도록 설정 */
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 20px 0; /* 상단과 하단 여백 설정 */
}
</style>
