import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/util/http-commons";

export const useCrewStore = defineStore("crew", () => {
  const allCrewList = ref({});

  const getAllCrewList = function () {
    console.log("전체 크루 리스트 가져오기");
    http.get("crew").then((res) => {
      allCrewList.value = res.data;
      console.log(allCrewList.value);
    });
  };

  const myCrewList = ref({});

  const getMyCrewList = function () {
    console.log("내 크루 리스트 가져오기");
  
    // this.$route.params.userId를 사용하여 현재 라우트의 userId를 가져옴
    const userId = this.$route.params.userId;
  
    http.get(`userCrew/${userId}`).then((res) => {
      console.log(`${userId}`)
      console.log(myCrewList.value)
      myCrewList.value = res.data;
    });
  };

  const crewDetail = ref({});

  const getCrewDetail = function () {
    console.log("크루 상세보기");

    const crewId = window.location.pathname.split("/").pop();

    http.get(`crew/${crewId}`).then((res) => {
      console.log(`${crewId}`);
      console.log(res.data);
      crewDetail.value = res.data;
    });
  };

  return {
    allCrewList,
    getAllCrewList,
    myCrewList,
    getMyCrewList,
    crewDetail,
    getCrewDetail,
  };
});
