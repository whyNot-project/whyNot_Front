<template>
  <div>
    <h3>전체크루 리스트</h3>
    
    <v-switch
      v-model="isInside"
      hide-details
      true-value="1"
      false-value="0"
      :label="`Is Inside: ${isInside}`"
    ></v-switch>

    <v-switch
      v-model="isSingle"
      hide-details
      true-value="1"
      false-value="0"
      :label="`Is Single: ${isSingle}`"
    ></v-switch>

    <v-switch
      v-model="isCardio"
      hide-details
      true-value="1"
      false-value="0"
      :label="`Is Cardio: ${isCardio}`"
    ></v-switch>

    <v-switch
      v-model="useEquip"
      hide-details
      true-value="1"
      false-value="0"
      :label="`Use Equipment: ${useEquip}`"
    ></v-switch>

    <v-list lines="three">
      <v-list-item
        v-for="crew in crews"
        :key="crew.crewId"
        :title="crew.crewName"
        :subtitle="crew.content"
        :href="crew.crewId"
        :prepend-avatar="`/fires/${crew.tag}.png`"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useCrewStore } from "@/stores/Crew";

const crewStore = useCrewStore();

let crews = computed(() => crewStore.allCrewList);

onBeforeMount(() => {
  crewStore.getAllCrewList();
  console.log(crews);
});

</script>

<style scoped></style>
