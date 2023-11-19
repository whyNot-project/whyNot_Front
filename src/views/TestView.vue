<template>
  <div class="card">
    <p class="progress">{{ currentQuestion.questionNum }}/4</p>
    <h2>{{ currentQuestion.question }}</h2>
    <img :src="currentQuestion.imgSrc" class="questionImg" />
    <button class="option" @click="selectOption(0)">
      {{ currentQuestion.option1 }}
      <img src="@/assets/arrowLeft.png" class="arrowIcon" />
    </button>
    <button class="option" @click="selectOption(1)">
      {{ currentQuestion.option2 }}
      <img src="@/assets/arrowLeft.png" class="arrowIcon" />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const questionList = [
  {
    questionNum: 1,
    question: "나는",
    imgSrc: "src/assets/mainThumbnail1.jpg",
    option1: "밖에서 계절감을 느끼는 것이 좋다.",
    option2: "실내에서 쾌적하게 있는 것이 좋다.",
  },
  {
    questionNum: 2,
    question: "무언가 작업을 할 때",
    imgSrc: "src/assets/mainThumbnail1.jpg",
    option1: "내 페이스대로 진행하는 게 좋다.",
    option2: "마음맞는 사람들과 함께 하는 게 좋다.",
  },
  {
    questionNum: 3,
    question: "운동을 할 때 ",
    imgSrc: "src/assets/mainThumbnail1.jpg",
    option1: "근육량을 키우는 것을 목표로 하고 싶다.",
    option2: "체력을 기르고 싶다.",
  },
  {
    questionNum: 4,
    question: "운동하고 있는 나, 내가 생각하기에 더 멋있는 나의 모습은?",
    imgSrc: "src/assets/mainThumbnail1.jpg",
    option1: "운동은 장비빨. 멋진 장비와 함께 있는 내 모습",
    option2: "튜닝의 끝은 순정. 장비 없이도 충분히 즐기는 나의 모습",
  },
];

let currentQuestionIndex = 0;

const answer = [];

const currentQuestion = ref(questionList[currentQuestionIndex]);

const selectOption = (option) => {
  option === 0 ? answer.push(0) : answer.push(1);
  currentQuestionIndex++;

  if (currentQuestionIndex === questionList.length) {
    console.log(answer);
  } else {
    currentQuestion.value = questionList[currentQuestionIndex];
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress {
  background-color: silver;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 15px;
}

.questionImg {
  width: 300px;
  margin: 20px;
}

.option {
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 400;
  padding: 10px 30px;
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.option:hover {
  background-color: silver;
  border: 1px solid silver;
  color: white;
  cursor: pointer;
}

.arrowIcon {
  width: 17px;
  height: 17px;
  margin-left: 20px;
}
</style>
