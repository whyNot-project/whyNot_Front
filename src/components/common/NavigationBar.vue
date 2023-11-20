<template>
  <div>
    <nav>
      <div>
        <RouterLink to="/" class="navItem">홈</RouterLink>
        |
        <RouterLink to="/activity" class="navItem">액티비티</RouterLink>
        |
        <RouterLink to="/crew" class="navItem">크루</RouterLink>
        |
        <RouterLink to="/wnbti" class="navItem">운BTI</RouterLink>
      </div>
      <img src="@/assets/logo.png" class="logoImg" />
      <div class="userNav">
        <button class="loginButton">로그인</button>
        <img
          src="@/assets/sidebarIcon.png"
          class="sidebarIcon"
          @click="sideBarClick"
        />
      </div>
      <div
        class="sideBar"
        :class="{
          show: sideBarShow,
          hide: !sideBarShow,
          firstRender: firstRender,
        }"
      >
        <img
          src="@/assets/sidebarIcon.png"
          class="sidebarIconIn"
          @click="sideBarClick"
        />
        <input />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sideBarShow = ref(false);
const firstRender = ref(true);

const sideBarClick = () => {
  firstRender.value = false;
  sideBarShow.value = !sideBarShow.value;
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  padding: 0 25px;
}

.navItem {
  font-size: 21px;
  text-decoration: none;
  color: grey;
  font-weight: 600;
  padding: 0 10px;
}

.router-link-exact-active {
  color: black; /* 활성화된 링크의 텍스트 색상: 검정색 */
}

.logoImg {
  min-width: 125px;
  height: 150px;
  position: absolute;
  transform: translate(-50%, 0);
  left: 50%;
}

.sidebarIcon {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.loginButton {
  background-color: transparent;
  border: none;
  height: 40px;
  width: 60px;
  font-weight: 600;
  font-size: 16px;
  margin-right: 20px;
}

.userNav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sideBar {
  position: absolute;
  right: 0px;
  top: 0;
  background-color: #f5f5f5;
  width: 250px;
  height: 100vh;
}

.sidebarIconIn {
  width: 50px;
  height: 50px;
  margin: 55px 0 0 15px;
  cursor: pointer;
}

@keyframes show {
  from {
    transform: translateX(250px);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes hide {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(250px);
  }
}
.hide {
  animation: hide 0.5s forwards;
}

.show {
  animation: show 0.5s forwards;
}

.firstRender {
  /* 첫 렌더링 시 애니메이션 보이지 않도록 */
  display: none;
}
</style>
