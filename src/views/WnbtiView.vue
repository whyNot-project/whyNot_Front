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
      <div :style="{ color: textColor }" class="colorName">{{ color }}색</div>
      의 불꽃을 가지고 계신
      {{ loginStatus ? nickname + "님!" : "당신!" }} <br />
      같은 불꽃 색을 가진 크루와 함께 해보러 갈까요?
      <v-btn variant="plain" class="goButton" @click="movePage">
        Let's go! <img src="@/assets/arrow2.png" class="arrowIcon"
      /></v-btn>
    </div>
  </div>
</template>

<script setup>
import { useTestStore } from "@/stores/Test.js";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

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

const textColor = computed(() => {
  switch (color.value) {
    case "네이비 피오니":
      return "#223A5D";
    case "다우니":
      return "#82B8AD";
    case "댄덜라이언":
      return "#FFD966";
    case "로즈버드":
      return "#D9927A";
    case "바닐라 아이스":
      return "#E6D0CF";
    case "세룰리안":
      return "#9AB7D4";
    case "스위트 핑크":
      return "#F1A4AB";
    case "스프라우트":
      return "#BCC9A6";
    case "앨리스 블루":
      return "#EAEFF9";
    case "오션딥스":
      return "#4D6878";
    case "오션베이":
      return "#648181";
    case "오아시스":
      return "#F2DCB3";
    case "웜플레임":
      return "#B6634A";
    case "캑터스":
      return "#5A6C55";
    case "퀄트스":
      return "#D7D4E9";
    case "페리글라스 블루":
      return "#AEB1B0";
  }
});

const router = useRouter();
const movePage = () => {
  loginStatus.value ? router.push("/crew") : router.push("/registUser");
};
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
  position: relative;
}

.colorName {
  display: inline-block;
}

.text1 {
  margin-bottom: 50px;
}

.text2 {
  display: flex;
  justify-content: right;
}

.goButton {
  position: absolute;
  bottom: -80px;
  right: 10px;
  font-size: 22px;
}

.arrowIcon {
  width: 20px;
  height: 20px;
  margin: 5px 0 0 10px;
}
</style>
