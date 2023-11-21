<template>
  <div>
    <h3>내 크루 리스트</h3>
    <v-list lines="three">
      <v-list-item
        v-for="crew in myCrews"
        :key="crew.crewId"
        :title="crew.crewName"
        :subtitle="crew.schedule"
        @click="$router.push(`/crew/${crew.crewId}`)"
      >
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRoute } from "vue-router";

const crewStore = useCrewStore();
const route = useRoute();

let myCrews = computed(() => crewStore.myCrewList);

const userId = localStorage.getItem("userId");

onBeforeMount(() => {
  crewStore.getMyCrewList(userId);
});
</script>

<style scoped></style>
