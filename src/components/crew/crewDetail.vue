<template>
  <h2>크루 상세보기</h2>
  <div class="crew-details">
    <div class="crew-image">
      <img
        :src="`/fires/${crews.tag}.png`"
        alt="Crew Image"
        class="crew-avatar"
      />
    </div>
    <div class="crew-info">
      <h1 class="crew-name">{{ crews.crewName }}</h1>
      <p class="content">일시 : {{ crews.schedule }}</p>
      <p class="content">인원 : {{ joinNum }} / {{ crews.memberNum }}명</p>
      <p class="content">운동 : {{ getActivityName(crews.tag) }}</p>
      <p class="content">장소 : {{ crews.location }}</p>
      <p class="content">리더 : {{ crews.leader }}</p>
      <p class="schedule">크루 소개 :{{ crews.content }}</p>
      <v-btn @click="joinCrew" class="mt-2">가입하기</v-btn>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, onMounted, ref } from "vue";
import { useCrewStore } from "@/stores/Crew";
import { useRouter, useRoute } from "vue-router";
import http from "@/util/http-commons.js";

const crewStore = useCrewStore();
const route = useRoute();
const router = useRouter();

let crews = computed(() => crewStore.crewDetail);

const crewId = route.params.crewId;
const userId = localStorage.getItem("userId");

const joinNum = ref();

onMounted(() => {
  http.get(`userCrew/joinNum/${crewId}`).then((res) => {
    joinNum.value = res.data;
  });
});

const joinCrew = () => {
  if (joinNum.value >= crews.value.memberNum) {
    alert("아쉽지만 인원이 다 찼어요. 다른 크루를 가입해주세요");
  } else {
    http
      .post("userCrew", {
        userId: userId,
        crewId: crewId,
      })
      .then(() => {
        crewStore.getMyCrewList(userId);
      })
      .then(() => {
        router.push("/userCrew");
      })
      .catch(() => {
        alert("이미 가입한 크루입니다!");
        router.push("/userCrew");
      });
  }
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
