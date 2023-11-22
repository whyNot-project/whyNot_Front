import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TestView from "@/views/TestView.vue";
import RegistUserView from "@/views/RegistUserView.vue";
import ActivityView from "@/views/ActivityView.vue";
import CrewView from "@/views/CrewView.vue";
import crewDetail from "@/components/crew/crewDetail.vue";
import RegistCrewView from "@/views/RegistCrewView.vue";
import WnbtiView from "@/views/WnbtiView.vue";
import AllCrewList from "@/components/crew/AllCrewList.vue";
import MyCrewList from "@/components/crew/MyCrewList.vue";
import SearchCrew from "@/components/crew/SearchCrew.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
    {
      path: "/registUser",
      name: "registUser",
      component: RegistUserView,
    },
    {
      path: "/activity",
      name: "activity",
      component: ActivityView,
    },
    {
      //이 자체가 전체crew
      path: "/crew",
      component: CrewView,
      children: [
        //크루 상세
        {
          path: "/crew/:crewId",
          name: "crewDetail",
          component: crewDetail,
        },
        //전체크루
        {
          path: "",
          name: "AllCrewList",
          component: AllCrewList,
        },
        //내크루
        {
          path: "/userCrew",
          name: "MyCrewList",
          component: MyCrewList,
        },
        //검색된 크루
        {
          path: "/search/crew",
          name: "SearchCrew",
          component: SearchCrew,
        },
      ],
    },
    {
      path: "/registCrew",
      name: "registCrew",
      component: RegistCrewView,
    },
    {
      path: "/wnbti",
      name: "wnbti",
      component: WnbtiView,
    },
  ],
});

export default router;
