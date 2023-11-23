<template>
  <h2>나와 맞는 크루 찾기</h2>
  <div class="switch-container">
    <div class="switches">
      <div class="switch-item" @click="toggleSwitch(1)">
        <div class="switch-label">{{ switchValue ? "실내" : "실외" }}</div>
        <div class="switch-toggle" :class="{ active: switchValue }"></div>
      </div>
      <div class="switch-item" @click="toggleSwitch(2)">
        <div class="switch-label">{{ switchValue2 ? "혼자" : "함께" }}</div>
        <div class="switch-toggle" :class="{ active: switchValue2 }"></div>
      </div>
      <div class="switch-item" @click="toggleSwitch(3)">
        <div class="switch-label">{{ switchValue3 ? "유산소" : "무산소" }}</div>
        <div class="switch-toggle" :class="{ active: switchValue3 }"></div>
      </div>
      <div class="switch-item" @click="toggleSwitch(4)">
        <div class="switch-label">
          {{ switchValue4 ? "기구사용" : "맨몸운동" }}
        </div>
        <div class="switch-toggle" :class="{ active: switchValue4 }"></div>
      </div>
      <div class="switch-item">
        <v-checkbox v-model="checkboxValue" label="전체 크루 보기"></v-checkbox>
      </div>
    </div>

    <div class="crew-list">
      <div
        v-if="checkboxValue"
        class="crew-card"
        v-for="crew in crews"
        :key="crew.crewId"
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
          <p>
            {{ crew.memberNum - Math.floor(crew.memberNum / 2) }} /
            {{ crew.memberNum }}명
          </p>
          <p>{{ crew.content }}</p>
        </div>
      </div>
      <div
        v-else
        class="crew-card"
        v-for="crew in selectedCrew"
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
          <p>
            {{ crew.memberNum - Math.floor(crew.memberNum / 2) }} /
            {{ crew.memberNum }}명
          </p>
          <p>{{ crew.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, onMounted } from "vue";
import { useCrewStore } from "@/stores/Crew";
import http from "@/util/http-commons.js";

const crewStore = useCrewStore();

let crews = computed(() => crewStore.allCrewList);
let selectedCrew = ref({});

onMounted(() => {
  temp();
}),
  onBeforeMount(() => {
    crewStore.getAllCrewList();
  });

// 스위치 기본 값
let switchValue = ref(false);
let switchValue2 = ref(false);
let switchValue3 = ref(false);
let switchValue4 = ref(false);

const checkboxValue = ref(false);

// 스위치 상태에 따라 값 바꾸기
const toggleSwitch = (switchVar) => {
  switch (switchVar) {
    case 1:
      switchValue.value = !switchValue.value;
      break;
    case 2:
      switchValue2.value = !switchValue2.value;
      break;
    case 3:
      switchValue3.value = !switchValue3.value;
      break;
    case 4:
      switchValue4.value = !switchValue4.value;
      break;
  }
  searchCondition();
};

const getValue = (value) => (value ? 1 : 0);

// 스위치 상태에 따라 반환되는 리스트 바꿔주기
const searchCondition = () => {
  http
    .get("/crew/search", {
      params: {
        isInside: getValue(switchValue.value),
        isSingle: getValue(switchValue2.value),
        isCardio: getValue(switchValue3.value),
        useEquip: getValue(switchValue4.value),
      },
    })
    .then((res) => {
      selectedCrew.value = res.data;
    });
};

//////////////////////////////////////////////////

//페이지 들어왔을 때 사용자의 유형에 따라 검색조건 세팅

const temp = function () {
  const userId = localStorage.getItem("userId");
  const isInside = ref("");
  const isSingle = ref("");
  const isCardio = ref("");
  const useEquip = ref("");

  http
    .get(`/userCrew/${userId}`, {
      userId: userId,
    })
    .then((res) => {
      isInside.value = res.data[0].isInside;
      isSingle.value = res.data[0].isSingle;
      isCardio.value = res.data[0].isCardio;
      useEquip.value = res.data[0].useEquip;
      console.log(res.data);
      http
        .get("/crew/search", {
          params: {
            isInside: `${isInside.value}`,
            isSingle: `${isSingle.value}`,
            isCardio: `${isCardio.value}`,
            useEquip: `${useEquip.value}`,
          },
        })
        .then((res) => {
          selectedCrew.value = res.data;
          switchValue.value = Boolean(isInside.value);
          switchValue2.value = Boolean(isSingle.value);
          switchValue3.value = Boolean(isCardio.value);
          switchValue4.value = Boolean(useEquip.value);
        });
    });
};
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

.switches {
  display: flex;
  justify-content: center;
}

.switch-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.switch-label {
  margin-right: 8px;
}

.switch-toggle {
  width: 30px;
  height: 15px;
  background-color: #ccc;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.switch-toggle.active {
  background-color: #2196f3;
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
