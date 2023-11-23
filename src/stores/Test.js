import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTestStore = defineStore(
  "article",
  () => {
    const testAnswer = ref([]);
    const getColor = computed(() => {
      const colorIndex = parseInt(testAnswer.value.join(""), 2);
      const colors = [
        "네이비 피오니",
        "바닐라 아이스",
        "댄덜라이언",
        "스위트 핑크",
        "다우니",
        "세룰리안",
        "로즈버드",
        "스프라우트",
        "앨리스 블루",
        "웜플레임",
        "오션베이",
        "퀄트스",
        "오션딥스",
        "캑터스",
        "오아시스",
        "페리글라스 블루",
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
