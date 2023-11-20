<template>
  <div>
    <h3>크루 상세</h3>
    <v-card variant="outlined">
      <v-card-title>{{ crews.crewName }}</v-card-title>
      <v-card-subtitle>{{ crews.schedule }}</v-card-subtitle>
      <v-card-text>{{ crews.content }}</v-card-text>

      <v-card-actions>
        <v-btn @click="$router.push('registCrew')">가입하기</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRoute } from "vue-router";

const crewStore = useCrewStore();
const route = useRoute();

let crews = computed(() => crewStore.crewDetail);

onMounted(() => {
  crewStore.getCrewDetail();
});
</script>

<style scoped></style>
