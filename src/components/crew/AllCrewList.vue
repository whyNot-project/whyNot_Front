<template>
  <div>
    <h3>전체크루 리스트</h3>
    <div class="switches">
      <v-switch
        @click="toggleSwitch(1)"
        v-model="switchValue"
        color="primary"
        :label="` ${switchValue ? '유산소' : '무산소'}`"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch(2)"
        v-model="switchValue2"
        :label="` ${switchValue2 ? '실내' : '실외'}`"
        color="primary"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch(3)"
        v-model="switchValue3"
        :label="` ${switchValue3 ? '혼자' : '같이'}`"
        color="primary"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch(4)"
        v-model="switchValue4"
        :label="` ${switchValue4 ? '기구사용' : '맨몸운동'}`"
        color="primary"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-checkbox v-model="checkboxValue" label="전체 크루 보기"></v-checkbox>
    </div>

    <v-list lines="three">
      <v-list-item
        v-if="checkboxValue"
        v-for="crew in crews"
        :key="crew.crewId"
        :title="crew.crewName"
        :subtitle="crew.content"
        @click="$router.push(`/crew/${crew.crewId}`)"
        :prepend-avatar="`/fires/${crew.tag}.png`"
      ></v-list-item>
    </v-list>

    <v-list lines="three">
      <v-list-item
        v-if="!checkboxValue"
        v-for="crew in selectedCrew"
        :key="crew.crewId"
        :title="crew.crewName"
        :subtitle="crew.content"
        @click="$router.push(`/crew/${crew.crewId}`)"
        :prepend-avatar="`/fires/${crew.tag}.png`"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, onMounted } from "vue";
import { useCrewStore } from "@/stores/Crew";
import http from "@/util/http-commons.js";

const crewStore = useCrewStore();

let crews = computed(() => crewStore.allCrewList);
let selectedCrew = ref({});

onMounted(() => {
  temp();
}),
  onBeforeMount(() => {
    crewStore.getAllCrewList();
  });

// 스위치 기본 값
let switchValue = ref(false);
let switchValue2 = ref(false);
let switchValue3 = ref(false);
let switchValue4 = ref(false);

const checkboxValue = ref(false);

// 스위치 상태에 따라 값 바꾸기
const toggleSwitch = (switchVar) => {
  switch (switchVar) {
    case 1:
      switchValue.value = !switchValue.value;
      break;
    case 2:
      switchValue2.value = !switchValue2.value;
      break;
    case 3:
      switchValue3.value = !switchValue3.value;
      break;
    case 4:
      switchValue4.value = !switchValue4.value;
      break;
  }
  searchCondition();
};

const getValue = (value) => (value ? 1 : 0);

// 스위치 상태에 따라 반환되는 리스트 바꿔주기
const searchCondition = () => {
  console.log(getValue(switchValue.value));
  console.log(getValue(switchValue2.value));
  console.log(getValue(switchValue3.value));
  console.log(getValue(switchValue4.value));
  console.log("----------------------");
  http
    .get("/crew/search", {
      params: {
        isCardio: getValue(switchValue.value),
        isInside: getValue(switchValue2.value),
        isSingle: getValue(switchValue3.value),
        useEquip: getValue(switchValue4.value),
      },
    })
    .then((res) => {
      console.log(res.data);
      selectedCrew.value = res.data;
    });
};

//////////////////////////////////////////////////

//페이지 들어왔을 때 사용자의 유형에 따라 검색조건 세팅

const temp = function () {
  //mounted로 바꾸던가....해.. 새로고침 할 때만 뜸

  const userId = localStorage.getItem("userId");

  const isInside = ref("");
  const isSingle = ref("");
  const isCardio = ref("");
  const useEquip = ref("");

  http
    .get(`/userCrew/${userId}`, {
      userId: userId,
    })
    .then((res) => {
      isInside.value = res.data[0].isInside;
      isSingle.value = res.data[0].isSingle;
      isCardio.value = res.data[0].isCardio;
      useEquip.value = res.data[0].useEquip;
      http
        .get("/crew/search", {
          //params로 가져오기
          params: {
            isInside: `${isInside.value}`,
            isSingle: `${isSingle.value}`,
            isCardio: `${isCardio.value}`,
            useEquip: `${useEquip.value}`,
          },
        })
        .then(() => {
          switchValue.value = isInside.value;
          switchValue2.value = isSingle.value;
          switchValue3.value = isCardio.value;
          switchValue4.value = useEquip.value;
        });
    });
};
</script>

<style scoped>
.switches {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
