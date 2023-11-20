<template>
  <div class="mainSection">
    <div class="textArea">
      <p class="mainText text1">
        {{ loginStatus ? nickname + "님은," : "당신은" }}
      </p>
      <div class="answerList subText">
        <p>{{ testAnswer[0] === 0 ? "실외에서" : "실내에서" }}</p>
        <p>{{ testAnswer[1] === 0 ? "혼자" : "같이" }}</p>
        <p>{{ testAnswer[2] === 0 ? "기구 없이" : "기구로" }}</p>
        <p>{{ testAnswer[3] === 0 ? "유산소 운동" : "무산소 운동" }}</p>
      </div>
      <p class="mainText text2">하는 걸 좋아해요.</p>
    </div>
    <div class="suggestText">
      {{ color }}색의 불꽃을 가지고 계신
      {{ loginStatus ? nickname + "님!" : "당신!" }} <br />
      같은 불꽃 색을 가진 크루와 함께 해보러 갈까요?
    </div>
  </div>
</template>

<script setup>
import { useTestStore } from "@/stores/Test.js";
import { ref, onMounted } from "vue";

const store = useTestStore();
const loginStatus = ref(false);
const testAnswer = ref(store.testAnswer); //결과 배열
const nickname = ref(localStorage.getItem("nickname"));
const color = ref(store.getColor);
const accessToken = ref(localStorage.getItem("accessToken"));

onMounted(() => {
  if (accessToken.value) loginStatus.value = true;
  else loginStatus.value = false;
});
</script>

<style scoped>
.mainSection {
  padding: 80px 200px;
}
.answerList {
  display: flex;
  gap: 15px;
}

.mainText {
  font-size: 40px;
  font-weight: 700;
}

.subText {
  font-size: 25px;
  color: grey;
  font-weight: 700;
  display: flex;
  justify-content: center;
}

.suggestText {
  margin-top: 80px;
  font-size: 45px;
  font-weight: 700;
}

.text1 {
  margin-bottom: 50px;
}

.text2 {
  display: flex;
  justify-content: right;
}
</style>
