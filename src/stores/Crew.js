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
    myCrewList.value = res.data;
  };

  const crewDetail = ref({});

  const getCrewDetail = function (crewId) {
    console.log("크루 상세보기");
    http.get(`crew/${crewId}`).then((res) => {
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
