<template>
  <h2>내 크루 리스트</h2>
  <div class="switch-container">
    <div class="crew-list">
      <div
        v-for="crew in myCrews"
        :key="crew.crewId"
        class="crew-card"
        @click="$router.push(`/crew/${crew.crewId}`)"
      >
        <img
          :src="`/fires/${crew.tag}.png`"
          alt="Crew Image"
          class="crew-avatar"
        />
        <div class="crew-details">
          <h2>{{ crew.crewName }}</h2>
          <p style="font-weight: bold">{{ crew.location }}</p>
          <p>{{ crew.schedule }}</p>
          <p>{{ crew.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useCrewStore } from "@/stores/Crew";

const crewStore = useCrewStore();

let myCrews = computed(() => crewStore.myCrewList);

const userId = localStorage.getItem("userId");

onBeforeMount(() => {
  crewStore.getMyCrewList(userId);
});
</script>

<style scoped>
h2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.switch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.crew-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.crew-card {
  cursor: pointer;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.crew-card:hover {
  transform: scale(1.05);
}

.crew-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.crew-details {
  text-align: center;
}
</style>
