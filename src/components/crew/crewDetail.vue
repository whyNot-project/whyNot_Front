<template>
  <div>
    <h3>크루 상세</h3>
    <v-card variant="outlined">
      <v-card-title>{{ crews.crewName }}</v-card-title>
      <v-card-subtitle>{{ crews.schedule }}</v-card-subtitle>
      <v-card-text>{{ crews.content }}</v-card-text>

      <v-card-actions>
        <v-btn @click="$router.push('MyCrewList')">가입하기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRoute } from "vue-router";

const crewStore = useCrewStore();
const route = useRoute();

let crews = computed(() => crewStore.crewDetail);

const crewId = route.params.crewId;

onBeforeMount(() => {
  crewStore.getCrewDetail(crewId);
  console.log(crewId);
  console.log("asd");
});
</script>

<style scoped></style>
