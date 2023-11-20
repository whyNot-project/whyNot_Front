import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTestStore = defineStore(
  "article",
  () => {
    const testAnswer = ref([]);
    const getColor = computed(() => {
      const colorIndex = parseInt(testAnswer.value.join(""), 2);
      const colors = [
        "스위트 핑크",
        "댄덜라이언",
        "바닐라 아이스",
        "네이비",
        "스프라우트",
        "로즈버드",
        "세룰리안",
        "다우니",
        "퀄트스",
        "오션베이",
        "웜플레임",
        "페리",
        "앨리스 블루",
        "오아시스",
        "캑터스",
        "오션딥스",
      ];
      return colors[colorIndex];
    });
    const initAnswer = () => {
      testAnswer.value = [];
    };

    return { testAnswer, getColor, initAnswer };
  },
  { persist: true }
);