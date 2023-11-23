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
import http from "@/util/http-commons.js";

const store = useTestStore();
const loginStatus = ref(false);
const testAnswer = ref(store.testAnswer); //결과 배열
const nickname = ref(localStorage.getItem("nickname"));
const color = ref(store.getColor);
const accessToken = ref(localStorage.getItem("accessToken"));
const userId = localStorage.getItem("userId");

onMounted(() => {
  if (accessToken.value) {
    loginStatus.value = true;
    http
      .get(`user/${userId}`, {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //유저의 기존 타입에 맞게 업데이트
        const type = res.data[0].type;
        color.value = getColor(type);
        testAnswer.value = getTestAnswer(type);
      });
  } else {
    console.log(testAnswer.value);
    if (testAnswer.value.length === 0) {
      alert("테스트를 진행한 내역이 없어요! 테스트를 먼저 진행해주세요 :)");
      router.push("/test");
    }
    loginStatus.value = false;
  }
});

const getTestAnswer = (type) => {
  switch (type) {
    case 1:
      return [0, 0, 0, 0];
    case 2:
      return [0, 1, 0, 0];
    case 3:
      return [0, 0, 1, 0];
    case 4:
      return [0, 1, 1, 0];
    case 5:
      return [0, 0, 0, 1];
    case 6:
      return [0, 1, 0, 1];
    case 7:
      return [0, 0, 1, 1];
    case 8:
      return [0, 1, 1, 1];
    case 9:
      return [1, 0, 0, 0];
    case 10:
      return [1, 1, 0, 0];
    case 11:
      return [1, 0, 1, 0];
    case 12:
      return [1, 1, 1, 0];
    case 13:
      return [1, 0, 0, 1];
    case 14:
      return [1, 1, 0, 1];
    case 15:
      return [1, 0, 1, 1];
    case 16:
      return [1, 1, 1, 1];
  }
};

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

const getColor = (type) => {
  switch (type) {
    case 1:
      return "네이비 피오니";
    case 2:
      return "다우니";
    case 3:
      return "댄덜라이언";
    case 4:
      return "로즈버드";
    case 5:
      return "바닐라 아이스";
    case 6:
      return "세룰리안";
    case 7:
      return "스위트 핑크";
    case 8:
      return "스프라우트";
    case 9:
      return "앨리스 블루";
    case 10:
      return "오션딥스";
    case 11:
      return "오션베이";
    case 12:
      return "오아시스";
    case 13:
      return "웜플레임";
    case 14:
      return "캑터스";
    case 15:
      return "퀄트스";
    case 16:
      return "페리글라스 블루";
  }
};

const router = useRouter();
const movePage = () => {
  loginStatus.value ? router.push("/crew") : router.push("/registUser");
};
</script>

<style scoped>
.mainSection {
  padding: 65px 250px;
}
.answerList {
  display: flex;
  gap: 15px;
}

.mainText {
  font-size: 35px;
  font-weight: 700;
}

.subText {
  font-size: 45px;
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
  margin-top: 40px;
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
