<template>
  <nav>
    <div class="nav-container">
      <div class="nav-left">
        <RouterLink class="navItem" :to="{ name: 'AllCrewList' }"
          >전체크루</RouterLink
        >
        |
        <RouterLink class="navItem" :to="{ name: 'MyCrewList' }"
          >내크루</RouterLink
        >
        |
      </div>
      <div class="nav-right">
        <v-btn @click="$router.push('/registCrew')" class="mt-2"
          >크루만들기</v-btn
        >
      </div>
    </div>
    <hr class="nav-divider" />
    <RouterView />
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  if (!localStorage.getItem("accessToken")) {
    alert("이 서비스를 이용하려면 로그인이 필요해요!");
    router.push("/");
  }
});
</script>

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
  width: 80%;
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
  color: black;
}

.nav-divider {
  width: 80%;
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
}
</style>
