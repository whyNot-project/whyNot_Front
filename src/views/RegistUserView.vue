<template>
  <h2>회원가입</h2>
  <div>
    <v-form v-model="form" @submit.prevent="onSubmit" class="registForm">
      <v-text-field
        v-model="id"
        class="mb-2"
        clearable
        label="아이디"
      ></v-text-field>

      <v-text-field v-model="nickname" clearable label="닉네임"></v-text-field>

      <v-text-field
        v-model="password"
        clearable
        label="비밀번호"
      ></v-text-field>

      <v-text-field
        v-model="phoneNumber"
        clearable
        label="핸드폰 번호"
        placeholder="010-1234-1234"
        hint="000-0000-0000 형식으로 적어주세요."
      ></v-text-field>

      <v-radio-group inline v-model="gender" label="성별">
        <v-radio label="남자" value="false"></v-radio>
        <v-radio label="여자" value="true"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="address"
        clearable
        label="거주 지역"
        placeholder="서울시 광진구 광장동"
        hint="최소 시, 구, 동을 모두 입력 해주세요."
      ></v-text-field>

      <v-file-input
        v-model="profileImg"
        label="File input"
        accept="image/png, image/jpeg, image/jpg"
      ></v-file-input>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import http from "@/util/http-commons.js";
import httpMultipart from "@/util/http-commons-multipart.js";
import { useTestStore } from "@/stores/Test.js";
import { useRouter } from "vue-router";

const store = useTestStore();
const router = useRouter();

const getType = () => {
  switch (store.getColor) {
    case "네이비":
      return 1;
    case "다우니":
      return 2;
    case "댄덜라이언":
      return 3;
    case "로즈버드":
      return 4;
    case "바닐라 아이스":
      return 5;
    case "세룰리안":
      return 6;
    case "스위트 핑크":
      return 7;
    case "스프라우트":
      return 8;
    case "앨리스 블루":
      return 9;
    case "오션딥스":
      return 10;
    case "오션베이":
      return 11;
    case "오아시스":
      return 12;
    case "웜플레임":
      return 13;
    case "캑터스":
      return 14;
    case "퀄트스":
      return 15;
    case "페리":
      return 16;
  }
};
const form = ref();
const id = ref();
const nickname = ref();
const password = ref();
const phoneNumber = ref();
const gender = ref();
const address = ref();
const profileImg = ref();

const onSubmit = () => {
  const formData = new FormData();
  formData.append("userId", id.value);
  formData.append("nickname", nickname.value);
  formData.append("password", password.value);
  formData.append("phoneNumber", phoneNumber.value.replaceAll("-", ""));
  formData.append("gender", gender.value == "남자" ? false : true);
  formData.append("location", address.value);
  formData.append("type", getType());
  formData.append("imgFile", profileImg.value[0]);

  console.log(profileImg.value[0]);
  for (let key of formData.keys()) {
    console.log(key, ":", formData.get(key));
  }
  httpMultipart.post("user", formData).then(() => {
    //회원가입 성공하면 로그인 처리
    http
      .post("login", {
        userId: id.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data["access-token"]);
        localStorage.setItem("userId", id.value);
        localStorage.setItem("nickname", res.data["nickname"]);
        router.go(0);
      });
  });
};

const accessToken = ref(localStorage.getItem("accessToken"));
onMounted(() => {
  if (accessToken.value && router.currentRoute.value.path !== "/crew") {
    {
      router.push("/crew");
    }
  }
});
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 10px;
}
.registForm {
  width: 350px;
  margin: 50px auto 0 auto;
}
</style>
