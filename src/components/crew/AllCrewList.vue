<template>
  <div>
    <h3>전체크루 리스트</h3>
    <div class="switches">
      <v-switch
        @click="toggleSwitch"
        v-model="switchValue"
        color="primary"
        :label="` ${switchValue ? '유산소' : '무산소'}`"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch"
        v-model="switchValue2"
        :label="` ${switchValue2 ? '실내' : '실외'}`"
        color="primary"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch"
        v-model="switchValue3"
        :label="` ${switchValue3 ? '혼자' : '같이'}`"
        color="primary"
        hide-details
        :disabled="checkboxValue"
      ></v-switch>
      <v-switch
        @click="toggleSwitch"
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
      >true</v-list-item>

      <v-list-item
        v-if="!checkboxValue"
        v-for="crew in selectedCrew"
        :key="crew.crewId"
        :title="crew.crewName"
        :subtitle="crew.content"
        @click="$router.push(`/crew/${crew.crewId}`)"
        :prepend-avatar="`/fires/${crew.tag}.png`"
      >false</v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { useCrewStore } from "@/stores/Crew";
import http from "@/util/http-commons.js";

const crewStore = useCrewStore();


let crews = computed(() => crewStore.allCrewList);
let selectedCrew = computed(()=> crewStore.selectedCrew);

onBeforeMount(() => {
  crewStore.getAllCrewList();
});

// 스위치 기본 값
const switchValue = ref(false);
const switchValue2 = ref(false);
const switchValue3 = ref(false);
const switchValue4 = ref(false);

const checkboxValue = ref(true);

// 스위치 상태에 따라 값 바꾸기
const toggleSwitch = (switchVar) => {
  switchVar.value = !switchVar.value;
  searchCondition();
};

const getValue = (value) => (value ? 1 : 0);

// 스위치 상태에 따라 반환되는 리스트 바꿔주기
const searchCondition = () => {
  http.post("/crew/search", {
    isCardio: getValue(switchValue.value),
    isInside: getValue(switchValue2.value),
    isSingle: getValue(switchValue3.value),
    useEquip: getValue(switchValue4.value),
  })
  .then((res)=>{
    console.log(getValue(switchValue.value))
    console.log(getValue(switchValue2.value))
    console.log(getValue(switchValue3.value))
    console.log(getValue(switchValue4.value))
    console.log(res.data)
  })
};
</script>

<style scoped>
.switches {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
