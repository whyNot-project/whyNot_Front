<template>
  <div>
    <h3>크루 만들기</h3>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
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

        <v-text-field v-model="tag" label="운동"> </v-text-field>

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

const crewName = ref("");
const schedule = ref("");
const memberNum = ref("");
const tag = ref("");
const location = ref("");
const content = ref("");

const createCrew = () => {
  // 이 부분에 실제로 서버로 데이터를 전송하는 로직을 추가해야 합니다.
  // 현재는 콘솔에 데이터를 출력하는 예시 코드입니다.
  console.log({
    crewName: crewName.value,
    schedule: schedule.value,
    memberNum: memberNum.value,
    tag: tag.value,
    location: location.value,
    content: content.value,
  });
};
</script>

<style scoped></style>
