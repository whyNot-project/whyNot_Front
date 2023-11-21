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

        <v-text-field
          v-model="content"
          label="크루를 소개하는 글을 적어주세요."
          :counter="50"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2">크루 만들기</v-btn>
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

const onRegist = () => {
  console.log(crewName.value)
  console.log(localStorage.getItem("userId"))
  http.post("crew",{
    crewName: crewName.value,
    schedule: schedule.value,
    memberNum: memberNum.value,
    tag: getTag(),
    location: location.value,
    content: content.value,
    leader: localStorage.getItem("userId")
  })
};
const items = ref(["러닝", "축구", "스케이트보드", "테니스", "등산", "요가",
"골프", "패러글라이딩", "수영", "댄스스포츠", "피트니스", "폴댄스", "발레",
"복싱", "클라이밍", "크로스핏"]);

const getTag = () => {
  switch (tag.value){
  case "러닝" :
    return 1;
  case "축구" :
    return 2;
  case "스케이트보드" :
    return 3;
  case "테니스" :
    return 4;
  case "등산" :
    return 5;
  case "요가" :
    return 6;
  case "골프" :
    return 7;
  case "패러글라이딩" :
    return 8;
  case "수영" :
    return 9;
  case "댄스스포츠" :
    return 10;
  case "피트니스" :
    return 11;
  case "폴댄스" :
    return 12;
  case "발레" :
    return 13;
  case "복싱" :
    return 14;
  case "클라이밍" :
    return 15;
  case "크로스핏" :
    return 16;
  }
}

</script>

<style scoped>
h2 {
  text-align: center;
  margin: 20px;
}</style>
