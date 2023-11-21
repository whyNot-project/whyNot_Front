<template>
  <div>
    <h3>전체크루 리스트</h3>
    <div class="switches">
      <v-switch
        v-model="switchValue"
        color="primary"
        :label="` ${switchValue ? '실내' : '실외'}`"
        hide-details
      >
      </v-switch>
      <v-switch
        v-model="switchValue2"
        :label="` ${switchValue2 ? '도구' : '맨몸'}`"
        color="primary"
        hide-details
      ></v-switch>
      <v-switch
        v-model="switchValue3"
        :label="` ${switchValue3 ? '혼자' : '같이'}`"
        color="primary"
        hide-details
      ></v-switch>
      <v-switch
        v-model="switchValue4"
        :label="` ${switchValue4 ? '유산소' : '무산소'}`"
        color="primary"
        hide-details
      ></v-switch>
      <v-checkbox label="전체"></v-checkbox>
    </div>

    <v-list lines="three">
      <v-list-item
        v-for="crew in crews"
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
import { computed, onBeforeMount, ref } from "vue";
import { useCrewStore } from "@/stores/Crew";

const crewStore = useCrewStore();

let crews = computed(() => crewStore.allCrewList);

onBeforeMount(() => {
  crewStore.getAllCrewList();
});

const switchValue = ref(false);
const switchValue2 = ref(false);
const switchValue3 = ref(false);
const switchValue4 = ref(false);
</script>

<style scoped>
.switches {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
