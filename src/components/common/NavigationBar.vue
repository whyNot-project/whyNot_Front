<template>
  <div>
    <nav>
      <div>
        <RouterLink to="/" class="navItem">홈</RouterLink>
        |
        <RouterLink to="/activity" class="navItem">액티비티</RouterLink>
        |
        <RouterLink to="/reservation" class="navItem">공간 예약</RouterLink>
        |
        <RouterLink to="/crew" class="navItem">크루</RouterLink>
        |
        <RouterLink to="/wnbti" class="navItem">운BTI</RouterLink>
        |
        <RouterLink to="/article" class="navItem">아티클</RouterLink>
      </div>
      <img src="@/assets/logo.png" class="logoImg" @click="logoClick" />
      <div class="userNav">
        <button v-if="!loginStatus" class="loginButton" @click="sideBarClick">
          로그인
        </button>
        <button v-else class="helloText">{{ nickname }}님, 안녕하세요!</button>
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
        <v-form
          v-if="!loginStatus"
          v-model="form"
          @submit.prevent="onSubmit"
          class="loginForm"
        >
          <v-text-field
            v-model="id"
            class="mb-2"
            clearable
            label="아이디"
            placeholder="아이디를 입력해주세요"
          ></v-text-field>

          <v-text-field
            v-model="password"
            clearable
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
          ></v-text-field>

          <br />

          <v-btn
            :disabled="!form"
            block
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
        <div v-else class="loginInfo">
          <img :src="profileImg" class="profileImg" />
          <p class="profileNickname">{{ nickname }}</p>
          <a
            @click="showCalendar"
            :data-text="calendar ? '달력 숨기기 📆' : '달력 보기 📆'"
            class="calendarButton"
          >
          </a>
          <template v-if="calendar">
            <FullCalendar class="calendar" />
          </template>
          <button @click="logout" class="logoutButton">로그아웃</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import http from "@/util/http-commons.js";
import { useRouter } from "vue-router";
import FullCalendar from "./FullCalendar.vue";

const sideBarShow = ref(false);
const firstRender = ref(true);
const profileImg = ref(null);

const router = useRouter();

const form = ref();
const id = ref();
const password = ref();

const loginStatus = ref(false);
const nickname = ref(localStorage.getItem("nickname"));
const accessToken = ref(localStorage.getItem("accessToken"));
const userId = ref(localStorage.getItem("userId"));
const calendar = ref(false);
const showCalendar = () => {
  calendar.value = !calendar.value;
};

onMounted(() => {
  if (accessToken.value) {
    loginStatus.value = true;
    http
      .get(`user/profile/${userId.value}`, {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const imageUrl = res.data;
        const staticStrIndex = imageUrl.indexOf("static");
        const imageUrlpath = imageUrl.substring(staticStrIndex);
        profileImg.value = imageUrlpath;
      });
  } else loginStatus.value = false;
});
const logoClick = () => {
  router.push("/");
};

const logout = () => {
  localStorage.clear();
  router.go(0);
};

const sideBarClick = () => {
  if (firstRender.value) firstRender.value = false;
  sideBarShow.value = !sideBarShow.value;
};
const onSubmit = () => {
  http
    .post("login", {
      userId: id.value,
      password: password.value,
    })
    .then((res) => {
      localStorage.setItem("accessToken", res.data["access-token"]);
      localStorage.setItem("userId", id.value);
      localStorage.setItem("nickname", res.data["nickname"]);
      sideBarShow.value = !sideBarShow.value;
      loginStatus.value = true;
      nickname.value = localStorage.getItem("nickname");
      http
        .get(`user/profile/${id.value}`, {
          headers: {
            "access-token": localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          const imageUrl = "/" + res.data;
          profileImg.value = imageUrl;
        });
    });
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

.navItem:hover {
  color: black;
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
  cursor: pointer;
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

.helloText {
  background-color: transparent;
  border: none;
  height: 40px;
  width: 180px;
  font-weight: 600;
  font-size: 16px;
  margin-right: 10px;
}

.userNav {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sideBar {
  position: fixed;
  right: 0px;
  top: 0;
  background-color: #f5f5f5;
  width: 300px;
  height: 100vh;
  z-index: 10;
}

.sidebarIconIn {
  width: 50px;
  height: 50px;
  margin: 55px 0 0 15px;
  cursor: pointer;
}

@keyframes show {
  from {
    transform: translateX(300px);
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
    transform: translateX(300px);
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

.loginForm {
  width: 220px;
  margin: 120px auto 0 auto;
}

.loginInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profileImg {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-top: 40px;
}

.profileNickname {
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
}

.calendarButton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -320%);
  width: 140px;
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: #ccc;
  cursor: pointer;
}
.calendarButton:before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: grey;
  color: #fff;
  transition: 0.5s;
  transform-origin: bottom;
  transform: translatey(-100%) rotatex(90deg);
}
.calendarButton:hover:before {
  transform: translatey(0) rotatex(0deg);
}

.calendarButton:after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: grey;
  color: #fff;
  transition: 0.5s;
  transform-origin: top;
  transform: translatey(0) rotatex(0deg);
}
.calendarButton:hover:after {
  transform: translatey(100%) rotatex(90deg);
}

.calendar {
  margin-top: 100px;
  width: 240px;
  font-size: 14px;
}

.logoutButton {
  text-decoration: underline;
  color: grey;
  position: absolute;
  bottom: 20px;
}
</style>
