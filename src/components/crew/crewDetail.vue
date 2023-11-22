<template>
  <h2>크루 상세보기</h2>
  <div class="crew-details">
    <div class="crew-image">
      <img :src="`/fires/${crews.tag}.png`" alt="Crew Image" class="crew-avatar" />
    </div>
    <div class="crew-info">
      <h1 class="crew-name">{{ crews.crewName }}</h1>
      <p class="content">일시 : {{ crews.schedule }}</p>
      <p class="content">인원 : {{crews.memberNum - Math.floor(crews.memberNum/2)}} / {{ crews.memberNum }}명</p>
      <p class="content">운동 : {{ getActivityName(crews.tag) }}</p>
      <p class="content">장소 : {{ crews.location }}</p>
      <p class="schedule">크루 소개 :{{ crews.content }}</p>
      <v-btn @click="joinCrew" class="mt-2">가입하기</v-btn>
    </div>
  </div>
  <ReplyView/>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRoute } from "vue-router";
import http from "@/util/http-commons.js";
import ReplyView from "@/views/ReplyView.vue";

const crewStore = useCrewStore();
const route = useRoute();

let crews = computed(() => crewStore.crewDetail);

const crewId = route.params.crewId;
const userId = localStorage.getItem("userId");

const joinCrew = () => {
  http.post("/userCrew", {
    userId: userId,
    crewId: crewId,
  }).then(()=>{
    //여기에서 페이지 이동을 해야함
  })
};
const getActivityName = (tag) => {
  switch (tag) {
    case 1:
      return "러닝";
    case 2:
      return "축구";
    case 3:
      return "스케이트보드";
    case 4:
      return "테니스";
    case 5:
      return "등산";
    case 6:
      return "요가";
    case 7:
      return "골프";
    case 8:
      return "패러글라이딩";
    case 9:
      return "수영";
    case 10:
      return "댄스스포츠";
    case 11:
      return "피트니스";
    case 12:
      return "폴댄스";
    case 13:
      return "발레";
    case 14:
      return "복싱";
    case 15:
      return "클라이밍";
    case 16:
      return "크로스핏";
  }
};

onBeforeMount(() => {
  crewStore.getCrewDetail(crewId);
});
</script>

<style scoped>

h2 {
  text-align: center;
  margin: 20px;
}

.crew-details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  margin-bottom: 150px;
}

.crew-avatar {
  width: 200px;
  height: 200px;
  border-radius: 8px;  
  margin-top: 40px;
  margin-right: 100px;
}

.crew-info {
  flex: 1;
  padding-left: 20px;
}

.crew-name {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}

.schedule {
  font-size: 18px;
  margin-bottom: 10px;
}

.content {
  font-size: 16px;
  margin-bottom: 10px;
}

</style>
