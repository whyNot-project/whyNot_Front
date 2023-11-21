<template>
  <div>
    <h3>전체크루 리스트</h3>
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
import { computed, onBeforeMount } from "vue";
import { useCrewStore } from "@/stores/Crew";

const crewStore = useCrewStore();

let crews = computed(() => crewStore.allCrewList);

onBeforeMount(() => {
  crewStore.getAllCrewList();
});
</script>

<style scoped></style>
