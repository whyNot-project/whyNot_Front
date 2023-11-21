<template>
  <div>
    <h3>크루 상세</h3>
    <v-card variant="outlined" @click.prevent="joinCrew">
      <v-card-title>{{ crews.crewName }}</v-card-title>
      <v-card-subtitle>{{ crews.schedule }}</v-card-subtitle>
      <v-card-text>{{ crews.content }}</v-card-text>

      <v-card-actions>
        <v-btn @click="$router.push('/userCrew')">가입하기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRoute } from "vue-router";
import http from "@/util/http-commons.js";

const crewStore = useCrewStore();
const route = useRoute();

let crews = computed(() => crewStore.crewDetail);

const crewId = route.params.crewId;
const userId = localStorage.getItem("userId");

const joinCrew = () => {
  http.post("userCrew", {
    userId: userId,
    crewId: crewId,
  });
};

onBeforeMount(() => {
  crewStore.getCrewDetail(crewId);
});
</script>

<style scoped></style>
