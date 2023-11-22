<template>
  <div>
    <h2>크루 만들기</h2>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent="onRegist">
        <v-text-field
          v-model="crewName"
          label="크루 이름을 입력하세요."
          :counter="20"
        ></v-text-field>

        <v-text-field
          v-model="schedule"
          label="언제 모이실 예정인가요?"
          hint="YYYY-MM-DD 형식으로 작성해주세요"
        ></v-text-field>

        <v-text-field
          v-model="memberNum"
          label="몇 명을 모집하고 싶으신가요?"
          hint="숫자만 입력해주세요."
        ></v-text-field>

        <v-select
          v-model="tag"
          :items="items"
          label="함께 즐길 액티비티 선택하기"
          required
        ></v-select>

        <v-text-field
          v-model="location"
          label="모일 장소를 적어주세요."
        ></v-text-field>
        <button @click="write" class="writeButton" type="button">
          소개글 자동 생성
        </button>
        <v-text-field
          v-model="content"
          label="크루를 소개하는 글을 적어주세요."
          :counter="50"
        ></v-text-field>

        <v-btn
          @click="$router.push('/userCrew')"
          type="submit"
          block
          class="mt-2"
          >크루 만들기</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "@/util/http-commons.js";

const crewName = ref("");
const schedule = ref("");
const memberNum = ref("");
const tag = ref("");
const location = ref("");
const content = ref("");

const userId = localStorage.getItem("userId");

const onRegist = () => {
  http
    .post("crew", {
      crewName: crewName.value,
      schedule: schedule.value,
      memberNum: memberNum.value,
      tag: getTag(),
      location: location.value,
      content: content.value,
      leader: userId,
    })
    //내 크루에 추가
    .then((res) => {
      http.post("userCrew", {
        userId: userId,
        crewId: res.data[0].crewId,
      });
    });
};

const items = ref([
  "러닝",
  "축구",
  "스케이트보드",
  "테니스",
  "등산",
  "요가",
  "골프",
  "패러글라이딩",
  "수영",
  "댄스스포츠",
  "피트니스",
  "폴댄스",
  "발레",
  "복싱",
  "클라이밍",
  "크로스핏",
]);

const getTag = () => {
  switch (tag.value) {
    case "러닝":
      return 1;
    case "축구":
      return 2;
    case "스케이트보드":
      return 3;
    case "테니스":
      return 4;
    case "등산":
      return 5;
    case "요가":
      return 6;
    case "골프":
      return 7;
    case "패러글라이딩":
      return 8;
    case "수영":
      return 9;
    case "댄스스포츠":
      return 10;
    case "피트니스":
      return 11;
    case "폴댄스":
      return 12;
    case "발레":
      return 13;
    case "복싱":
      return 14;
    case "클라이밍":
      return 15;
    case "크로스핏":
      return 16;
  }
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getDateForm = (date, type) => {
  const dateArr = date.split("-");
  let result;
  type === "month" ? (result = dateArr[1]) : (result = dateArr[2]);
  if (result[0] === "0") return result[1];
  else return result;
};
const write = () => {
  const randomNum = random(1, 5);
  let result;
  switch (randomNum) {
    case 1:
      result =
        "함께 즐겁게 " +
        tag.value +
        "할 사람 구해요 :) " +
        getDateForm(schedule.value, "month") +
        "월 " +
        getDateForm(schedule.value, "day") +
        "일 " +
        location.value +
        "에서 시간 되는 " +
        memberNum.value +
        "분을 모집합니다!";
      break;
    case 2:
      result = "함께 즐겁게 " + tag.value + "할 사람 구해요 :) ";
      break;
    case 3:
      result =
        getDateForm(schedule.value, "month") +
        "월 " +
        getDateForm(schedule.value, "day") +
        "일 " +
        location.value +
        "에서 시간 되는 분 ~!";
      break;
    case 4:
      result = "같이 " + tag.value + "해요 :) 초보자 환영";
      break;
    case 5:
      result = location.value + "에서 함께 " + tag.value + "해요!";
      break;
  }
  content.value = result;
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 20px;
}

.writeButton {
  flex: 1 1 auto;
  margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  );
}

.writeButton:hover {
  background-position: right center; /* change the direction of the change here */
}
</style>
