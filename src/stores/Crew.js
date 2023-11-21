import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/util/http-commons";

export const useCrewStore = defineStore("crew", () => {
  const allCrewList = ref({});

  //전체 크루
  const getAllCrewList = function () {
    http.get("crew").then((res) => {
      allCrewList.value = res.data;
    });
  };

  const myCrewList = ref({});
  //내 크루
  const getMyCrewList = function (userId) {
    http.get(`userCrew/${userId}`).then((res) => {
      myCrewList.value = res.data;
    });
  };

  const crewDetail = ref({});
  //크루 상세
  const getCrewDetail = function (crewId) {
    http.get(`crew/${crewId}`).then((res) => {
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
